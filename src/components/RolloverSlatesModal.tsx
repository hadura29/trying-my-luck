import React, { useState } from 'react';
import { ScreenerRow, OddsFormat, SettingsConfig } from '../types/betting';
import { formatOdds } from '../services/accaEngine';
import { buildRolloverSlatesFromScreener } from '../data/spreadsheetData';
import { X, Sparkles, Check, Copy, ShieldCheck, Flame, CalendarDays, CheckCircle2 } from 'lucide-react';

interface RolloverSlatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  rows: ScreenerRow[];
  settings: SettingsConfig;
  oddsFormat: OddsFormat;
  isWeekend: boolean;
  setIsWeekend: (val: boolean) => void;
}

export const RolloverSlatesModal: React.FC<RolloverSlatesModalProps> = ({
  isOpen,
  onClose,
  rows,
  settings,
  oddsFormat,
  isWeekend,
  setIsWeekend,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const slates = buildRolloverSlatesFromScreener(rows, settings.targetOdds, isWeekend);

  const slateList = [
    { key: 'morning', ...slates.morningAcca, time: '11:30 - 13:30 BST' },
    { key: 'afternoon', ...slates.afternoonAcca, time: '14:30 - 16:30 BST' },
    ...(slates.teatimeAcca ? [{ key: 'teatime', ...slates.teatimeAcca, time: '16:30 - 18:30 BST' }] : []),
    { key: 'evening', ...slates.eveningAcca, time: '19:00 - 21:00 BST' },
    ...(slates.latenightAcca ? [{ key: 'latenight', ...slates.latenightAcca, time: '21:30 - 23:45 BST' }] : []),
  ];

  const handleCopySlip = (slateTitle: string, totalOdds: number, legs: ScreenerRow[], code: string) => {
    const text = `🏆 PADDY POWER 0.5 (1.50) ROLLOVER SLATE
📍 ${slateTitle}
🔢 Total Odds: ${formatOdds(totalOdds, oddsFormat)} (Target: 1.50)
🎟️ Booking Code: ${code}

SELECTIONS:
${legs.map((l, i) => `${i + 1}. ${l.fixture} [${l.league}]\n   👉 ${l.market} @ ${formatOdds(l.odds, oddsFormat)} (Model Prob: ${l.modelProb}%, Edge: +${l.edge} pts)`).join('\n')}

📈 Combined Probability: ${((legs.reduce((acc, l) => acc * (l.modelProb / 100), 1.0)) * 100).toFixed(1)}% (Breakeven: 66.7%)
💰 10x Rollover Step Execution`;

    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Combined 0.5 (1.50) Daily Rollover Slates
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                  {slateList.length} Daily Slips
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Synthesized directly from your BET-qualified Screener rows without stress.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Weekend Toggle */}
            <button
              onClick={() => setIsWeekend(!isWeekend)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors border ${
                isWeekend
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {isWeekend ? 'Weekend Slate (5 Accas)' : 'Weekday Slate (3 Accas)'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slates List */}
        <div className="p-5 overflow-y-auto space-y-4">
          {slateList.map((slate, idx) => {
            const bookingCode = `PP-ROLL-${1000 + idx * 77}`;
            return (
              <div
                key={slate.key}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4.5 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                      Slate #{idx + 1} · {slate.key.toUpperCase()}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-xs font-mono text-slate-400">{slate.time}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 mr-1.5">Odds:</span>
                      <span className="text-base font-bold font-mono text-emerald-400 tabular-nums">
                        {formatOdds(slate.totalOdds, oddsFormat)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 mr-1.5">Prob:</span>
                      <span className="text-xs font-bold font-mono text-amber-300 tabular-nums">
                        {slate.prob}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Legs */}
                <div className="divide-y divide-slate-800/40 my-2">
                  {slate.legs.map((leg, lIdx) => (
                    <div key={leg.id} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-white">
                          {lIdx + 1}. {leg.fixture} <span className="text-slate-500 font-normal">({leg.league})</span>
                        </div>
                        <div className="text-slate-300 mt-0.5 flex items-center gap-2">
                          <span className="text-emerald-400 font-medium">{leg.market}</span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="text-slate-400 font-mono">Model Prob: {leg.modelProb}%</span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="text-amber-400 font-mono font-bold">Edge: +{leg.edge} pts</span>
                        </div>
                      </div>

                      <div className="font-mono font-bold text-white text-sm">
                        {formatOdds(leg.odds, oddsFormat)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer and Copy */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-400 font-mono">
                    Booking Code: <strong className="text-slate-200">{bookingCode}</strong>
                  </div>

                  <button
                    onClick={() => handleCopySlip(slate.title, slate.totalOdds, slate.legs, bookingCode)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 font-medium transition-colors cursor-pointer"
                  >
                    {copiedCode === bookingCode ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedCode === bookingCode ? 'Copied!' : 'Copy 1.50 Bet Slip'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Targeting ~1.50 odds per slate for the 10x rollover progression.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
          >
            Close Slates
          </button>
        </div>
      </div>
    </div>
  );
};
