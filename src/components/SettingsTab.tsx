import React from 'react';
import { SettingsConfig } from '../types/betting';
import { DEFAULT_SETTINGS } from '../data/spreadsheetData';
import { Sliders, RotateCcw, Check, Sparkles, Info } from 'lucide-react';

interface SettingsTabProps {
  settings: SettingsConfig;
  setSettings: React.Dispatch<React.SetStateAction<SettingsConfig>>;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ settings, setSettings }) => {
  const handleChange = (key: keyof SettingsConfig, value: number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Sliders className="w-4 h-4" />
              <span>Model Parameters (Formula Inputs)</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Settings & Global Configuration
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Settings holds the numbers the formulas use, such as odds range, minimum edge, stake and stop-loss. 
              Change the <span className="text-blue-400 font-bold">blue input cells</span> below and everything across the Screener, Funnel and Rollover tabs updates immediately.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>
        </div>

        {/* Input Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
          {/* Target Odds */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-medium">Target Slip Odds (0.5 Profit)</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.05"
                min="1.20"
                max="2.50"
                value={settings.targetOdds}
                onChange={e => handleChange('targetOdds', Number(e.target.value))}
                className="w-full px-3 py-2 bg-blue-950/40 border border-blue-500/80 rounded-lg text-blue-300 font-mono text-lg font-bold focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div className="text-[11px] text-slate-500">
              Default: 1.50 (returns 1.50x per completed step)
            </div>
          </div>

          {/* Minimum Edge */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-medium">Minimum Edge for BET (Points)</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.5"
                min="1.0"
                max="25.0"
                value={settings.minEdge}
                onChange={e => handleChange('minEdge', Number(e.target.value))}
                className="w-full px-3 py-2 bg-blue-950/40 border border-blue-500/80 rounded-lg text-blue-300 font-mono text-lg font-bold focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div className="text-[11px] text-slate-500">
              Formula: Model Prob (%) &minus; Implied Prob (%) &ge; min edge
            </div>
          </div>

          {/* Odds Range Min */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-medium">Screener Odds Range Min</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.01"
                min="1.05"
                max="1.50"
                value={settings.oddsRangeMin}
                onChange={e => handleChange('oddsRangeMin', Number(e.target.value))}
                className="w-full px-3 py-2 bg-blue-950/40 border border-blue-500/80 rounded-lg text-blue-300 font-mono text-lg font-bold focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div className="text-[11px] text-slate-500">
              Minimum acceptable single leg price (e.g. 1.15)
            </div>
          </div>

          {/* Odds Range Max */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-medium">Screener Odds Range Max</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.01"
                min="1.30"
                max="2.50"
                value={settings.oddsRangeMax}
                onChange={e => handleChange('oddsRangeMax', Number(e.target.value))}
                className="w-full px-3 py-2 bg-blue-950/40 border border-blue-500/80 rounded-lg text-blue-300 font-mono text-lg font-bold focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div className="text-[11px] text-slate-500">
              Maximum acceptable single leg price (e.g. 1.60)
            </div>
          </div>

          {/* Initial Starting Stake */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-medium">Starting Stake (£)</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="5"
                min="5"
                max="500"
                value={settings.initialStake}
                onChange={e => handleChange('initialStake', Number(e.target.value))}
                className="w-full px-3 py-2 bg-blue-950/40 border border-blue-500/80 rounded-lg text-blue-300 font-mono text-lg font-bold focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div className="text-[11px] text-slate-500">
              Initial capital invested into Step 1 of the rollover
            </div>
          </div>

          {/* Stop-Loss Percentage */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-medium">Stop-Loss Drawdown (%)</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="5"
                min="5"
                max="50"
                value={settings.stopLossPercent}
                onChange={e => handleChange('stopLossPercent', Number(e.target.value))}
                className="w-full px-3 py-2 bg-blue-950/40 border border-blue-500/80 rounded-lg text-blue-300 font-mono text-lg font-bold focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div className="text-[11px] text-slate-500">
              Hard stop-loss limit to protect principal
            </div>
          </div>

          {/* Rollover Target Steps */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-medium">Rollover Target Steps</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="1"
                min="3"
                max="15"
                value={settings.rolloverSteps}
                onChange={e => handleChange('rolloverSteps', Number(e.target.value))}
                className="w-full px-3 py-2 bg-blue-950/40 border border-blue-500/80 rounded-lg text-blue-300 font-mono text-lg font-bold focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div className="text-[11px] text-slate-500">
              10 steps at 1.50 gives 57.7x payout
            </div>
          </div>

          {/* Board Fixtures (Weekend) */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-medium">Weekend Board Fixtures</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="10"
                min="50"
                max="500"
                value={settings.boardFixturesWeekend}
                onChange={e => handleChange('boardFixturesWeekend', Number(e.target.value))}
                className="w-full px-3 py-2 bg-blue-950/40 border border-blue-500/80 rounded-lg text-blue-300 font-mono text-lg font-bold focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div className="text-[11px] text-slate-500">
              Step 1 input for the weekend funnel (default: 150)
            </div>
          </div>

          {/* Default Leg Win Rate */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-medium">Target Leg Win Rate (%)</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="1"
                min="67"
                max="98"
                value={settings.defaultLegWinRate}
                onChange={e => handleChange('defaultLegWinRate', Number(e.target.value))}
                className="w-full px-3 py-2 bg-blue-950/40 border border-blue-500/80 rounded-lg text-blue-300 font-mono text-lg font-bold focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div className="text-[11px] text-slate-500">
              Used in Rollover tab sensitivity calculations (default: 85%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
