import React, { useState } from 'react';
import { buildRolloverSchedule } from '../services/accaEngine';
import { RolloverStep } from '../types/betting';
import { TrendingUp, ShieldCheck, CheckCircle2, Circle, AlertCircle, DollarSign } from 'lucide-react';

export const RolloverChallenge: React.FC = () => {
  const [initialStake, setInitialStake] = useState<number>(20);
  const [stepCount, setStepCount] = useState<number>(10);
  const [targetOdds, setTargetOdds] = useState<number>(1.50);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({ 1: true, 2: true });

  const schedule: RolloverStep[] = buildRolloverSchedule(initialStake, stepCount, targetOdds);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const finalReturn = schedule[schedule.length - 1]?.expectedReturn || 0;
  const totalMultiplier = (finalReturn / (initialStake || 1)).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Exponential Compound System</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              1.50 Banker Rollover Challenge
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              By hitting 3 daily banker accas on weekdays and 5 on weekends at 1.50 odds, 
              your bankroll compounds rapidly without relying on risky high-odds slips.
            </p>
          </div>

          {/* Quick Summary Pill */}
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-4 text-right shrink-0">
            <div className="text-xs text-slate-400 font-medium">Potential {stepCount}-Step Return</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tabular-nums">
              £{finalReturn.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-amber-400 font-medium mt-0.5">
              {totalMultiplier}x initial capital growth
            </div>
          </div>
        </div>

        {/* Challenge Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
          {/* Initial Stake */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Initial Starting Stake (£)
            </label>
            <div className="flex items-center gap-2">
              {[10, 20, 50, 100].map(val => (
                <button
                  key={val}
                  onClick={() => setInitialStake(val)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                    initialStake === val
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  £{val}
                </button>
              ))}
              <input
                type="number"
                min="5"
                max="500"
                value={initialStake}
                onChange={e => setInitialStake(Math.max(1, Number(e.target.value)))}
                className="w-16 px-2 py-1.5 text-xs font-mono bg-slate-950 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>

          {/* Steps */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Target Challenge Steps
            </label>
            <div className="flex items-center gap-2">
              {[5, 8, 10, 12].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => setStepCount(cnt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                    stepCount === cnt
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cnt} Steps
                </button>
              ))}
            </div>
          </div>

          {/* Target Odds */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Average Slip Odds (Target ~1.50)
            </label>
            <div className="flex items-center gap-2">
              {[1.45, 1.50, 1.55].map(o => (
                <button
                  key={o}
                  onClick={() => setTargetOdds(o)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                    targetOdds === o
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {o.toFixed(2)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step Schedule Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">
            Compound Step Matrix (Click to Mark Landed)
          </h3>
          <span className="text-xs text-slate-400">
            {Object.values(completedSteps).filter(Boolean).length} / {stepCount} steps landed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Step</th>
                <th className="py-3 px-4">Starting Stake</th>
                <th className="py-3 px-4">Target Odds</th>
                <th className="py-3 px-4 text-right">Expected Return</th>
                <th className="py-3 px-4 text-right">Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-xs sm:text-sm tabular-nums">
              {schedule.map(row => {
                const isDone = completedSteps[row.step];
                return (
                  <tr
                    key={row.step}
                    onClick={() => toggleStep(row.step)}
                    className={`cursor-pointer transition-colors ${
                      isDone
                        ? 'bg-emerald-950/20 text-emerald-300 hover:bg-emerald-950/30'
                        : 'text-slate-300 hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3 px-4">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600" />
                      )}
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      Step {row.step}
                    </td>
                    <td className="py-3 px-4">
                      £{row.startStake.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-amber-300">
                      {row.odds.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-400">
                      £{row.expectedReturn.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-500 font-semibold">
                      +£{row.profit.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mathematical Safety Explanation */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-200">The 1.50 Banker Mathematical Advantage:</span>{' '}
            Single 10-leg accumulators at 15.0 odds have an empirical win probability under 4.2%. 
            In contrast, breaking your journey into daily 1.50 banker accas composed of 2-3 ultra-safe legs (Over 0.5, Straight Win, Home to Score) 
            preserves a compounding expected value of &gt;95% per slip.
          </div>
        </div>
      </div>
    </div>
  );
};
