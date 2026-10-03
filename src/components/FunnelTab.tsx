import React, { useState } from 'react';
import { SettingsConfig } from '../types/betting';
import { computeFunnelSteps } from '../data/spreadsheetData';
import { Filter, CalendarDays, Flame, CheckCircle, Info, ChevronRight } from 'lucide-react';

interface FunnelTabProps {
  settings: SettingsConfig;
  isWeekend: boolean;
  setIsWeekend: (val: boolean) => void;
}

export const FunnelTab: React.FC<FunnelTabProps> = ({
  settings,
  isWeekend,
  setIsWeekend,
}) => {
  const steps = computeFunnelSteps(settings, isWeekend);
  const boardFixtures = isWeekend ? settings.boardFixturesWeekend : settings.boardFixturesWeekday;

  return (
    <div className="space-y-6">
      {/* Header and Mode Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Filter className="w-4 h-4" />
              <span>5-Step Systematic Filter Pipeline</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Daily Funnel: All Leagues
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              To land a daily 1.50 rollover without stress, the strategy shifts from finding a "sure thing" 
              to systematically filtering a large pool of matches for the highest-probability outcomes.
            </p>
          </div>

          {/* Weekend vs Weekday Funnel Toggle */}
          <div className="flex items-center bg-slate-950 p-1.5 rounded-lg border border-slate-800 shrink-0">
            <button
              onClick={() => setIsWeekend(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                !isWeekend
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Weekday Board ({settings.boardFixturesWeekday} Fixtures)</span>
            </button>
            <button
              onClick={() => setIsWeekend(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isWeekend
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Weekend Board ({settings.boardFixturesWeekend} Fixtures)</span>
            </button>
          </div>
        </div>

        {/* Funnel Pipeline Visualization */}
        <div className="pt-5 grid grid-cols-1 sm:grid-cols-5 gap-2">
          {steps.map((st, i) => (
            <div
              key={st.stepNumber}
              className={`p-3 rounded-xl border flex flex-col justify-between ${
                i === 4
                  ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300'
                  : 'bg-slate-950/70 border-slate-800 text-slate-300'
              }`}
            >
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Step {st.stepNumber}
              </div>
              <div className="text-sm font-bold text-white mt-1 truncate" title={st.name}>
                {st.name.replace(/^[0-9]\.\s*/, '')}
              </div>
              <div className="text-xl font-black font-mono mt-2 tabular-nums text-emerald-400">
                {st.fixturesLow === st.fixturesHigh
                  ? `${st.fixturesLow}`
                  : `${st.fixturesLow} - ${st.fixturesHigh}`}
                <span className="text-[10px] text-slate-400 font-normal ml-1">games</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spreadsheet Table: Daily Funnel */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">
            Daily Funnel: All Leagues Spreadsheet
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Target Odds: {settings.oddsRangeMin.toFixed(2)} - {settings.oddsRangeMax.toFixed(2)}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 w-44">Step</th>
                <th className="py-3 px-4">What you do</th>
                <th className="py-3 px-4 text-right">Survives low %</th>
                <th className="py-3 px-4 text-right">Survives high %</th>
                <th className="py-3 px-4 text-right">Fixtures low</th>
                <th className="py-3 px-4 text-right">Fixtures high</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono tabular-nums">
              {steps.map(row => {
                const isStep5 = row.stepNumber === 5;
                return (
                  <tr
                    key={row.stepNumber}
                    className={`transition-colors ${
                      isStep5
                        ? 'bg-emerald-950/20 text-emerald-300 hover:bg-emerald-950/30'
                        : 'text-slate-300 hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-sans font-bold text-white">
                      {row.name}
                    </td>

                    <td className="py-3.5 px-4 font-sans text-slate-300 max-w-md">
                      {row.whatYouDo}
                    </td>

                    <td className="py-3.5 px-4 text-right text-blue-400 font-bold">
                      {row.survivesLowPct > 0 ? `${row.survivesLowPct}%` : 'n/a'}
                    </td>

                    <td className="py-3.5 px-4 text-right text-blue-400 font-bold">
                      {row.survivesHighPct > 0 ? `${row.survivesHighPct}%` : 'n/a'}
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold text-white">
                      {row.fixturesLow.toFixed(1)}
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold text-emerald-400">
                      {row.fixturesHigh.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Funnel Notes - Matching Spreadsheet */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
          <div className="font-bold text-slate-200">Funnel Notes & Rules:</div>
          <p>
            • Survival percentages are the rough figures from the system rules, not measured data. Adjust them as you track real results.
          </p>
          <p>
            • <strong>Step 5 final picks:</strong> 2-6 real candidates on a 150+ game weekend (blue cells, edit in Settings). Some days zero, and <em>zero is a valid result</em>.
          </p>
          <p className="text-slate-500 font-mono text-[11px]">
            • Fixtures low/high = Settings fixtures on the board ({boardFixtures}) &times; survival %.
          </p>
        </div>
      </div>
    </div>
  );
};
