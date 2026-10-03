import React, { useState, useEffect } from 'react';
import { AccaSlip, OddsFormat } from '../types/betting';
import { formatOdds } from '../services/accaEngine';
import { X, Sparkles, ShieldCheck, Activity, Brain, MessageSquare } from 'lucide-react';

interface AiAnalysisModalProps {
  acca: AccaSlip | null;
  isOpen: boolean;
  onClose: () => void;
  oddsFormat: OddsFormat;
}

interface AnalysisResult {
  confidenceScore: number;
  xGVerdict: string;
  tacticalBreakdown: string[];
  bankerGuarantee: string;
}

export const AiAnalysisModal: React.FC<AiAnalysisModalProps> = ({
  acca,
  isOpen,
  onClose,
  oddsFormat,
}) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [source, setSource] = useState<string>('');

  useEffect(() => {
    if (isOpen && acca) {
      fetchAnalysis();
    }
  }, [isOpen, acca?.id]);

  const fetchAnalysis = async (customPrompt?: string) => {
    if (!acca) return;
    setLoading(true);
    try {
      const response = await fetch('/api/bot/ai-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchOrAccaTitle: `${acca.title} (${acca.slotName})`,
          legs: acca.legs.map(l => ({
            match: `${l.fixture.homeTeam} vs ${l.fixture.awayTeam}`,
            league: l.fixture.league,
            market: l.market.label,
            odds: l.market.odds,
            reasoning: l.market.reasoning,
          })),
          promptNote: customPrompt || 'Explain why this combination is a 100% sure 1.50 odds banker with xG support.',
        }),
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
        setSource(data.source || 'gemini-3.8-flash');
      }
    } catch (err) {
      console.error('Failed to get analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    fetchAnalysis(userQuestion);
    setUserQuestion('');
  };

  if (!isOpen || !acca) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Tactical AI Banker Breakdown
                </h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {source === 'gemini-3.8-flash' ? 'Gemini 3.8 Flash' : 'Banker Statistical Model'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {acca.title} · Total Odds: {formatOdds(acca.totalOdds, oddsFormat)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {/* Selections in this slip */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Analyzed Accumulator Selections
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              {acca.legs.map((leg, i) => (
                <div key={leg.id} className="flex items-center justify-between text-slate-300">
                  <span className="truncate">
                    {i + 1}. {leg.fixture.homeTeam} vs {leg.fixture.awayTeam} — <strong className="text-emerald-400">{leg.market.label}</strong>
                  </span>
                  <span className="font-bold text-white shrink-0 ml-2">
                    {formatOdds(leg.market.odds, oddsFormat)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Sparkles className="w-8 h-8 text-emerald-400 animate-spin" />
              <div className="text-sm font-medium">Crunching xG probability models and tactical match-ups...</div>
            </div>
          ) : analysis ? (
            <div className="space-y-4">
              {/* Confidence Score Pill */}
              <div className="p-4 bg-emerald-950/20 border border-emerald-800/50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Model Certainty Index</div>
                  <div className="text-2xl font-black font-mono text-emerald-400 tabular-nums">
                    {analysis.confidenceScore}% Sure Banker
                  </div>
                </div>
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>

              {/* xG Verdict */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Expected Goals (xG) Analysis</span>
                </h4>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200 leading-relaxed text-xs sm:text-sm">
                  {analysis.xGVerdict}
                </div>
              </div>

              {/* Tactical Points */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Key Tactical Factors Supporting 100% Landing
                </h4>
                <ul className="space-y-2">
                  {analysis.tacticalBreakdown.map((point, index) => (
                    <li
                      key={index}
                      className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Banker Guarantee */}
              <div className="p-3.5 bg-slate-950/90 rounded-lg border border-amber-900/40 text-amber-200/90 text-xs leading-relaxed">
                <strong>Why 1.50 Odds Lands:</strong> {analysis.bankerGuarantee}
              </div>
            </div>
          ) : null}

          {/* Ask the Bot Custom Query */}
          <form onSubmit={handleAskQuestion} className="pt-2">
            <label className="block text-xs font-semibold text-white mb-1.5">
              Ask AI Bot About This Slate:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={userQuestion}
                onChange={e => setUserQuestion(e.target.value)}
                placeholder="e.g. Why is Over 1.5 safer than Over 2.5 here?"
                className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={loading || !userQuestion.trim()}
                className="px-4 py-2 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg transition-colors disabled:opacity-50"
              >
                Inquire
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};
