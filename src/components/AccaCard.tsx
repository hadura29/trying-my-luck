import React, { useState } from 'react';
import { AccaSlip, AccaLeg, OddsFormat } from '../types/betting';
import { formatOdds } from '../services/accaEngine';
import { 
  Check, 
  Copy, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRightLeft, 
  Calculator,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

interface AccaCardProps {
  acca: AccaSlip;
  oddsFormat: OddsFormat;
  onOpenAiAnalysis: (acca: AccaSlip) => void;
  onSwapLeg: (accaId: string, legId: string) => void;
}

export const AccaCard: React.FC<AccaCardProps> = ({
  acca,
  oddsFormat,
  onOpenAiAnalysis,
  onSwapLeg,
}) => {
  const [stake, setStake] = useState<number>(20);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSlip, setCopiedSlip] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const potentialReturn = Number((stake * acca.totalOdds).toFixed(2));
  const potentialProfit = Number((potentialReturn - stake).toFixed(2));

  const copyBookingCode = () => {
    navigator.clipboard.writeText(acca.paddyPowerBookingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyFullSlip = () => {
    const text = `🏆 PADDY POWER 1.50 BANKER ACCA
📍 Slate: ${acca.slotName} (${acca.timeWindow})
🔢 Total Odds: ${formatOdds(acca.totalOdds, oddsFormat)} | Target: 1.50
🎟️ Booking Code: ${acca.paddyPowerBookingCode}

SELECTIONS:
${acca.legs
  .map(
    (l, idx) =>
      `${idx + 1}. ${l.fixture.homeTeam} vs ${l.fixture.awayTeam} [${l.fixture.league}]
   👉 ${l.market.label} @ ${formatOdds(l.market.odds, oddsFormat)} (Certainty: ${l.market.bankerRating}%)`
  )
  .join('\n')}

📈 Combined Probability: ${acca.combinedProbability}%
💰 £${stake} stake returns £${potentialReturn} (+£${potentialProfit} profit)`;

    navigator.clipboard.writeText(text);
    setCopiedSlip(true);
    setTimeout(() => setCopiedSlip(false), 2000);
  };

  const getStatusBadge = () => {
    if (acca.status === 'won') {
      return (
        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-xs bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>LANDED & WON</span>
        </span>
      );
    }
    if (acca.status === 'in_play') {
      return (
        <span className="inline-flex items-center gap-1 text-amber-400 font-semibold text-xs bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span>LIVE IN PLAY</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-slate-300 font-medium text-xs bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/40">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <span>KICKOFF UPCOMING</span>
      </span>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Card Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              {acca.slotName}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs font-mono text-slate-400">{acca.timeWindow}</span>
          </div>
          {getStatusBadge()}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">{acca.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{acca.description}</p>
          </div>

          {/* Odds & Probability Cluster */}
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <div className="text-right">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Combined Odds</div>
              <div className="text-2xl font-black font-mono text-emerald-400 tabular-nums">
                {formatOdds(acca.totalOdds, oddsFormat)}
              </div>
            </div>
            <div className="h-9 w-px bg-slate-800 hidden sm:block"></div>
            <div className="text-right">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Certainty Index</div>
              <div className="text-sm font-bold font-mono text-amber-300 tabular-nums">
                {acca.combinedProbability}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selections List */}
      <div className="divide-y divide-slate-800/60 flex-1">
        {acca.legs.map((leg, index) => {
          const isLegWon = leg.settledStatus === 'won';
          return (
            <div 
              key={leg.id} 
              className={`p-3.5 sm:p-4 hover:bg-slate-800/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isLegWon ? 'bg-emerald-950/10' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">{leg.fixture.league}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-400">{leg.fixture.kickoffTime} BST</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500">{leg.fixture.paddyCode}</span>
                  </div>

                  <div className="text-sm font-bold text-white mt-0.5">
                    {leg.fixture.homeTeam} <span className="text-slate-500 font-normal">vs</span> {leg.fixture.awayTeam}
                  </div>

                  {/* Market selection */}
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      {leg.market.label}
                    </span>
                    <span className="text-xs text-slate-400">
                      Reason: {leg.market.reasoning}
                    </span>
                  </div>
                </div>
              </div>

              {/* Leg Odds & Swap Action */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pl-8 sm:pl-0">
                {leg.liveScore && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 tabular-nums">
                    {leg.liveScore} {leg.matchMinute && `(${leg.matchMinute})`}
                  </span>
                )}

                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                    {formatOdds(leg.market.odds, oddsFormat)}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {leg.market.bankerRating}% sure
                  </div>
                </div>

                <button
                  onClick={() => onSwapLeg(acca.id, leg.id)}
                  className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors"
                  title="Swap market with alternative banker selection"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats & Statistical Model Disclosure */}
      <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800/80 text-xs">
        <button
          onClick={() => setShowStats(!showStats)}
          className="w-full flex items-center justify-between text-slate-400 hover:text-slate-200 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            <span>Statistical Model Audit & Dixon-Coles Parameters</span>
          </span>
          {showStats ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showStats && (
          <div className="mt-2.5 pt-2 border-t border-slate-800/60 text-slate-300 leading-relaxed space-y-2">
            {acca.statisticalAudit && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div>
                  <span className="text-slate-400">Home λ:</span>{' '}
                  <span className="text-emerald-400 font-bold">{acca.statisticalAudit.dixonColesLambdaHome} xG</span>
                </div>
                <div>
                  <span className="text-slate-400">Away λ:</span>{' '}
                  <span className="text-slate-300">{acca.statisticalAudit.dixonColesLambdaAway} xG</span>
                </div>
                <div>
                  <span className="text-slate-400">10k Monte Carlo:</span>{' '}
                  <span className="text-emerald-400 font-bold">{acca.statisticalAudit.monteCarloHitRate}%</span>
                </div>
                <div>
                  <span className="text-slate-400">+EV Margin:</span>{' '}
                  <span className="text-amber-400 font-bold">+{acca.statisticalAudit.expectedValueEV}%</span>
                </div>
              </div>
            )}
            <p><strong>Form & H2H Trend:</strong> {acca.statsHighlight}</p>
            {acca.aiTacticalSummary && (
              <p className="text-emerald-300/90"><strong>Tactical Model:</strong> {acca.aiTacticalSummary}</p>
            )}
          </div>
        )}
      </div>

      {/* Interactive Quick Stake Calculator */}
      <div className="p-4 bg-slate-950/90 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-400 font-medium">Stake:</span>
            {[10, 20, 50, 100].map(amt => (
              <button
                key={amt}
                onClick={() => setStake(amt)}
                className={`px-2 py-0.5 rounded text-xs font-mono font-medium transition-colors ${
                  stake === amt
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                £{amt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <span className="text-[11px] text-slate-400">Total Return: </span>
              <span className="text-sm font-bold font-mono text-white tabular-nums">
                £{potentialReturn.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400">Net Profit: </span>
              <span className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                +£{potentialProfit.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: 1-Click Copy Slip, Booking Code, AI Deep Audit */}
        <div className="mt-3.5 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={copyBookingCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition-colors"
              title="Copy Paddy Power Quick Booking Code"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Code: {acca.paddyPowerBookingCode}</span>
            </button>

            <button
              onClick={copyFullSlip}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition-colors"
            >
              {copiedSlip ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSlip ? 'Slip Copied!' : 'Copy Full Bet Slip'}</span>
            </button>
          </div>

          <button
            onClick={() => onOpenAiAnalysis(acca)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-md transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Tactical Breakdown</span>
          </button>
        </div>
      </div>
    </div>
  );
};
