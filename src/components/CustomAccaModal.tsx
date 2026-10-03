import React, { useState } from 'react';
import { MarketType, AccaSlip, OddsFormat } from '../types/betting';
import { LEAGUES } from '../data/fixtures';
import { X, Sparkles, Sliders, CheckSquare, Square } from 'lucide-react';

interface CustomAccaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccaGenerated: (acca: AccaSlip) => void;
  oddsFormat: OddsFormat;
}

export const CustomAccaModal: React.FC<CustomAccaModalProps> = ({
  isOpen,
  onClose,
  onAccaGenerated,
  oddsFormat,
}) => {
  const [targetOdds, setTargetOdds] = useState<number>(1.50);
  const [slot, setSlot] = useState<'all' | 'morning' | 'afternoon' | 'teatime' | 'evening' | 'latenight'>('all');
  const [leagueFilter, setLeagueFilter] = useState<string>('All Leagues');
  const [isGenerating, setIsGenerating] = useState(false);

  const [selectedMarkets, setSelectedMarkets] = useState<Record<MarketType, boolean>>({
    STRAIGHT_WIN: true,
    OVER_0_5: true,
    OVER_1_5: true,
    OVER_2_5: false,
    HOME_TO_SCORE: true,
    AWAY_TO_SCORE: false,
    DOUBLE_CHANCE: true,
  });

  if (!isOpen) return null;

  const toggleMarket = (key: MarketType) => {
    setSelectedMarkets(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const activeMarkets = (Object.keys(selectedMarkets) as MarketType[]).filter(
        k => selectedMarkets[k]
      );

      const response = await fetch('/api/bot/generate-custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slot,
          targetOdds,
          preferredMarkets: activeMarkets,
          leagueFilter,
        }),
      });

      const data = await response.json();
      if (data.success && data.acca) {
        onAccaGenerated(data.acca);
        onClose();
      }
    } catch (err) {
      console.error('Failed to generate custom acca:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Generate Custom 1.50 Banker Acca
              </h3>
              <p className="text-xs text-slate-400">
                Paddy Power Algorithm calibrated for high-certainty banker combinations.
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

        {/* Modal Body */}
        <div className="p-5 space-y-5 text-xs sm:text-sm">
          {/* Target Odds Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-white">Target Cumulative Odds</span>
              <span className="font-mono text-base font-bold text-emerald-400 tabular-nums">
                {targetOdds.toFixed(2)} {targetOdds === 1.50 && '(Default "0.5 Profit" Banker)'}
              </span>
            </div>
            <input
              type="range"
              min="1.35"
              max="1.75"
              step="0.05"
              value={targetOdds}
              onChange={e => setTargetOdds(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
              <span>1.35 (Ultra-Safe)</span>
              <span className="text-emerald-400 font-bold">1.50 (Standard Banker)</span>
              <span>1.75 (Higher Yield)</span>
            </div>
          </div>

          {/* Kickoff Slot */}
          <div>
            <label className="block font-semibold text-white mb-2">
              Kickoff Time Slot
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'Any Slot Today' },
                { id: 'morning', label: 'Morning (11:30 - 13:30)' },
                { id: 'afternoon', label: 'Afternoon (14:30 - 16:30)' },
                { id: 'teatime', label: 'Teatime (16:30 - 18:30)' },
                { id: 'evening', label: 'Evening (19:00 - 21:00)' },
                { id: 'latenight', label: 'Late Night (21:30 - 23:45)' },
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setSlot(s.id as any)}
                  className={`p-2 rounded-lg text-left text-xs font-medium border transition-colors ${
                    slot === s.id
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Market Types Mix */}
          <div>
            <label className="block font-semibold text-white mb-2">
              Permitted Market Types (Good Banker Mix)
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'STRAIGHT_WIN', label: 'Straight Win (Heavy Favorite)' },
                { id: 'OVER_0_5', label: 'Over 0.5 Total Goals' },
                { id: 'OVER_1_5', label: 'Over 1.5 Total Goals' },
                { id: 'OVER_2_5', label: 'Over 2.5 Total Goals (High Scoring)' },
                { id: 'HOME_TO_SCORE', label: 'Home Team to Score (Over 0.5)' },
                { id: 'AWAY_TO_SCORE', label: 'Away Team to Score (Over 0.5)' },
                { id: 'DOUBLE_CHANCE', label: 'Double Chance (1X / X2)' },
              ].map(m => {
                const checked = selectedMarkets[m.id as MarketType];
                return (
                  <button
                    key={m.id}
                    onClick={() => toggleMarket(m.id as MarketType)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-left border transition-colors ${
                      checked
                        ? 'bg-slate-950 border-emerald-800/80 text-white'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    {checked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                    <span className="truncate">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* League Filter */}
          <div>
            <label className="block font-semibold text-white mb-1.5">
              Specific League (Optional)
            </label>
            <select
              value={leagueFilter}
              onChange={e => setLeagueFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              {LEAGUES.map(l => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Compounding Odds...' : 'Build 1.50 Banker Acca'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
