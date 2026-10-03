import React, { useState } from 'react';
import { MARKETS_RELIABILITY_DATA } from '../data/spreadsheetData';
import { ShieldCheck, AlertOctagon, CheckCircle2, TrendingUp, Sparkles, Layers, ArrowRight } from 'lucide-react';

export const MarketsTab: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<number | 'ALL'>('ALL');

  const filteredMarkets = selectedTier === 'ALL' 
    ? MARKETS_RELIABILITY_DATA 
    : MARKETS_RELIABILITY_DATA.filter(m => m.tier === selectedTier);

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" />
          <span>Market Hierarchy & Variance Spectrum</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Markets Ranked by Reliability
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          For a stress-free 10x rollover, forget volatile markets like match cards or referee booking props. 
          Focus exclusively on low-variance markets with high mathematical baselines: Over 1.5 Goals, Double Chance (1X/X2), 
          and selective props like Goalkeeper Saves.
        </p>

        {/* Tier Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800 text-xs">
          <button
            onClick={() => setSelectedTier('ALL')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors border ${
              selectedTier === 'ALL'
                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            All Markets
          </button>
          <button
            onClick={() => setSelectedTier(1)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors border ${
              selectedTier === 1
                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Tier 1: Golden Core (Over 1.5, 1X/X2, Asian HC)
          </button>
          <button
            onClick={() => setSelectedTier(2)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors border ${
              selectedTier === 2
                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Tier 2: Team 2+ Goals & GK Saves
          </button>
          <button
            onClick={() => setSelectedTier(3)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors border ${
              selectedTier === 3
                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Tier 3: Corners & Over 2.5 (Conditional)
          </button>
          <button
            onClick={() => setSelectedTier(4)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors border ${
              selectedTier === 4
                ? 'bg-rose-500 text-slate-950 font-bold border-rose-400'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Tier 4: Cards (Strictly Avoid)
          </button>
        </div>
      </div>

      {/* Markets Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Market</th>
                <th className="py-3 px-4">Tier / Category</th>
                <th className="py-3 px-4">Typical PP Odds</th>
                <th className="py-3 px-4">Historical Hit Rate</th>
                <th className="py-3 px-4">Variance Level</th>
                <th className="py-3 px-4">Rollover Suitability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredMarkets.map((m, idx) => {
                const isTier1 = m.tier === 1;
                const isAvoid = m.tier === 4;

                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isAvoid
                        ? 'bg-rose-950/20 text-rose-300'
                        : isTier1
                        ? 'bg-emerald-950/20 text-slate-200'
                        : 'text-slate-300 hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-sm">{m.marketName}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{m.goldenRule}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isTier1 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        isAvoid ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        Tier {m.tier}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {m.typicalOdds}
                    </td>

                    <td className="py-3 px-4 font-mono text-emerald-400 font-semibold">
                      {m.baselineHitRate}
                    </td>

                    <td className="py-3 px-4 font-medium">
                      <span className={
                        m.varianceLevel === 'Ultra-Low' ? 'text-emerald-400 font-bold' :
                        m.varianceLevel === 'Low' ? 'text-emerald-300' :
                        m.varianceLevel === 'Moderate' ? 'text-amber-400' :
                        'text-rose-400 font-bold'
                      }>
                        {m.varianceLevel}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-sans text-slate-300">
                      {m.suitabilityForRollover}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guide: How to combine teams into 0.5 (1.50) odds safely without stress */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span>How to Combine Teams to Land 0.5 (1.50) Odds Safely Without Stress</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          {/* Method A: The High-Probability Double */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold uppercase text-[11px] tracking-wider">
              Strategy A: The Golden 2-Leg Banker Double
            </div>
            <p className="leading-relaxed">
              Combine two 85%+ model probability legs priced around <strong>1.18 to 1.25</strong>.
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1">
              <div>Leg 1: Over 1.5 Goals in elite match (85% prob @ 1.20)</div>
              <div>Leg 2: Heavy Favorite 1X Double Chance (85% prob @ 1.25)</div>
              <div className="text-emerald-400 font-bold pt-1 border-t border-slate-800">
                Combined Odds: 1.20 &times; 1.25 = 1.50 | Probability: 72.25%
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Why it works: 72.25% combined chance is significantly above the 66.7% breakeven hurdle, delivering a true mathematical buffer without stress.
            </p>
          </div>

          {/* Method B: The Single Heavyweight Play */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-amber-400 font-bold uppercase text-[11px] tracking-wider">
              Strategy B: The Single Heavyweight Play (Rare Spots)
            </div>
            <p className="leading-relaxed">
              A single bet at 1.45–1.55 on a dominant home team to score 2+ goals (Over 1.5 Team Goals) or Asian Handicap -1.5 against a defensively disorganized opponent.
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1">
              <div>Example: Celtic / Bayern / Man City Home to Score 2+ @ 1.48</div>
              <div>Model Probability: 78% - 82%</div>
              <div className="text-amber-300 font-bold pt-1 border-t border-slate-800">
                Single Bet: 1.48 Odds | Probability: ~80%
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Only execute when the home club averages &gt;2.6 goals/game and has no midweek rotation.
            </p>
          </div>
        </div>

        {/* What to Avoid */}
        <div className="p-3.5 bg-slate-950 rounded-lg border border-rose-900/40 text-xs text-rose-300/90 leading-relaxed flex items-start gap-2.5">
          <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong>Markets Strictly Banned from 10x Rollover:</strong> Never add match cards, player tackles, or exact corner lines to a 10x rollover slip. A referee's leniency or early blowouts instantly disrupt card lines and cause avoidable stress.
          </div>
        </div>
      </div>
    </div>
  );
};
