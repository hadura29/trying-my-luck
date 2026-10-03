import React, { useState } from 'react';
import { SettingsConfig, OddsFormat } from '../types/betting';
import { formatOdds } from '../services/accaEngine';
import { 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  Layers, 
  DollarSign, 
  Sparkles,
  Info 
} from 'lucide-react';

interface RolloverTabProps {
  settings: SettingsConfig;
  oddsFormat: OddsFormat;
}

export const RolloverTab: React.FC<RolloverTabProps> = ({ settings, oddsFormat }) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({ 1: true, 2: true });

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const stepsCount = settings.rolloverSteps;
  const initialStake = settings.initialStake;
  const targetOdds = settings.targetOdds; // 1.50

  // 1.50^10 = 57.665 ~ 57.7x
  const totalMultiplier = Math.pow(targetOdds, stepsCount);
  const finalPayout = initialStake * totalMultiplier;

  // Build 10-step ladder
  const ladder = [];
  let currentStake = initialStake;
  for (let s = 1; s <= stepsCount; s++) {
    const ret = currentStake * targetOdds;
    const profit = ret - initialStake;
    ladder.push({
      step: s,
      startStake: currentStake,
      odds: targetOdds,
      expectedReturn: ret,
      profit,
      isDone: !!completedSteps[s],
    });
    currentStake = ret;
  }

  // Sensitivity Analysis: Chance of landing all 10 at different per-leg win rates
  const sensitivityRates = [
    { winRate: 67, label: '67% (Breakeven)', desc: 'Bare minimum to break even at 1.50' },
    { winRate: 70, label: '70% Win Rate', desc: 'Slightly above breakeven' },
    { winRate: 75, label: '75% Win Rate', desc: 'Casual filter threshold' },
    { winRate: 80, label: '80% Win Rate', desc: 'Over 1.5 baseline minimum' },
    { winRate: 85, label: '85% Win Rate', desc: 'Target model probability for doubles' },
    { winRate: 90, label: '90% Win Rate', desc: 'Ultra-selective filtered banker picks' },
    { winRate: 95, label: '95% Win Rate', desc: 'Heavy favorite home cushion' },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>0.5 Odds (1.50) 10x Rollover Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              10-Leg Compounding Rollover Schedule
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Targeting 1.50 decimal odds (0.50 profit) across {stepsCount} consecutive legs yields a 
              <span className="text-emerald-400 font-bold ml-1 font-mono">{totalMultiplier.toFixed(1)}x payout</span> 
              ({formatOdds(targetOdds, oddsFormat)} odds compounded {stepsCount} times).
            </p>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-4 text-right shrink-0">
            <div className="text-xs text-slate-400 font-medium">Final Return ({stepsCount} Steps)</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tabular-nums">
              £{finalPayout.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-amber-400 font-medium mt-0.5 font-mono">
              {totalMultiplier.toFixed(1)}x Starting Bankroll (£{initialStake})
            </div>
          </div>
        </div>

        {/* Rollover Upper Bound Warning */}
        <div className="mt-4 p-3.5 bg-slate-950/80 rounded-lg border border-amber-900/40 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Punter Note on Expected Value:</strong> The expected value on this tab only holds if your per-leg win chance is truly valid and ignores Paddy Power's margin. Treat it as an <em>upper bound</em>, not a guaranteed forecast.
          </div>
        </div>
      </div>

      {/* Sensitivity Analysis Table: Chance of Landing all 10 */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <h3 className="text-base font-bold text-white tracking-tight mb-1 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Chance of Landing All 10 Legs at Different Win Rates</span>
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Shows how your per-leg accuracy directly impacts the cumulative 10-leg survival rate: Cumulative Survival = (Per-Leg Win Rate)¹⁰.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono tabular-nums">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Per-Leg Win Rate</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3 text-right">Probability of Landing All 10</th>
                <th className="py-2.5 px-3 text-right">Expected Value on £{initialStake}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sensitivityRates.map(r => {
                const dec = r.winRate / 100;
                const landAllProb = Math.pow(dec, stepsCount);
                const evReturn = landAllProb * finalPayout - initialStake;
                const isTarget = r.winRate === settings.defaultLegWinRate;

                return (
                  <tr
                    key={r.winRate}
                    className={`transition-colors ${
                      isTarget
                        ? 'bg-emerald-950/40 font-bold text-emerald-300'
                        : 'text-slate-300 hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-white">
                      {r.label}
                    </td>
                    <td className="py-2.5 px-3 font-sans text-slate-400">
                      {r.desc}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-400">
                      {(landAllProb * 100).toFixed(1)}%
                    </td>
                    <td className={`py-2.5 px-3 text-right ${evReturn >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {evReturn >= 0 ? `+£${evReturn.toFixed(2)}` : `-£${Math.abs(evReturn).toFixed(2)}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Step-by-Step 10-Leg Rollover Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              10-Leg Progression Ladder (Click Row to Mark Completed)
            </h3>
            <span className="text-xs text-slate-400">
              Targeting 1.50 per leg. Bankroll grows exponentially with zero added stress.
            </span>
          </div>
          <div className="text-xs font-mono text-slate-400">
            {Object.values(completedSteps).filter(Boolean).length} / {stepsCount} Completed
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono tabular-nums">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-3 w-10">Done</th>
                <th className="py-3 px-3">Step</th>
                <th className="py-3 px-3">Starting Stake</th>
                <th className="py-3 px-3">Target Odds</th>
                <th className="py-3 px-3 text-right">Expected Return</th>
                <th className="py-3 px-3 text-right">Cumulative Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {ladder.map(row => (
                <tr
                  key={row.step}
                  onClick={() => toggleStep(row.step)}
                  className={`cursor-pointer transition-colors ${
                    row.isDone
                      ? 'bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/40'
                      : 'text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-3 px-3">
                    {row.isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600" />
                    )}
                  </td>
                  <td className="py-3 px-3 font-bold text-white">
                    Leg {row.step}
                  </td>
                  <td className="py-3 px-3">
                    £{row.startStake.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-amber-300">
                    {formatOdds(row.odds, oddsFormat)}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-400">
                    £{row.expectedReturn.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right text-emerald-500 font-semibold">
                    +£{row.profit.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bank Profit & Stop Loss Rules */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Stop-Loss Guard:</strong> Stop if you lose {settings.stopLossPercent}% of your rollover bankroll. At Leg 4 (reaching £100+), you can bank your initial £{initialStake} and play entirely on house profit.
            </span>
          </div>
          <div className="text-[11px] text-slate-500 shrink-0 font-mono">
            Stop-Loss: £{(initialStake * (settings.stopLossPercent / 100)).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
