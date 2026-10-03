import React, { useState } from 'react';
import { ScreenerRow, SettingsConfig, OddsFormat } from '../types/betting';
import { formatOdds } from '../services/accaEngine';
import { 
  Filter, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Check, 
  Copy,
  ChevronDown,
  Info,
  SlidersHorizontal,
  Flame,
  Layers
} from 'lucide-react';

interface ScreenerTabProps {
  rows: ScreenerRow[];
  setRows: React.Dispatch<React.SetStateAction<ScreenerRow[]>>;
  settings: SettingsConfig;
  oddsFormat: OddsFormat;
  onCombineBets: () => void;
}

export const ScreenerTab: React.FC<ScreenerTabProps> = ({
  rows,
  setRows,
  settings,
  oddsFormat,
  onCombineBets,
}) => {
  const [filterBetOnly, setFilterBetOnly] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state for adding new row
  const [newFixture, setNewFixture] = useState('');
  const [newLeague, setNewLeague] = useState('');
  const [newMarket, setNewMarket] = useState('Over 1.5 Match Goals');
  const [newCategory, setNewCategory] = useState<'Goals' | 'Double Chance' | 'Corners' | 'GK Saves' | 'Cards' | 'Team Goals'>('Goals');
  const [newOdds, setNewOdds] = useState('1.20');
  const [newModelProb, setNewModelProb] = useState('88.0');
  const [newChaos, setNewChaos] = useState<'Y' | 'N'>('Y');
  const [newLineup, setNewLineup] = useState<'Y' | 'N'>('Y');
  const [newSlot, setNewSlot] = useState<'morning' | 'afternoon' | 'teatime' | 'evening' | 'latenight'>('afternoon');

  const handleToggleChaos = (id: string) => {
    setRows(prev =>
      prev.map(r => (r.id === id ? { ...r, chaosCheck: r.chaosCheck === 'Y' ? 'N' : 'Y' } : r))
    );
  };

  const handleToggleLineup = (id: string) => {
    setRows(prev =>
      prev.map(r => (r.id === id ? { ...r, lineupCheck: r.lineupCheck === 'Y' ? 'N' : 'Y' } : r))
    );
  };

  const handleDeleteRow = (id: string) => {
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const handleAddRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFixture) return;

    const newRow: ScreenerRow = {
      id: `row-${Date.now()}`,
      date: 'Today',
      fixture: newFixture,
      league: newLeague || 'Global League',
      market: newMarket,
      marketCategory: newCategory,
      odds: Number(newOdds) || 1.20,
      modelProb: Number(newModelProb) || 85.0,
      chaosCheck: newChaos,
      lineupCheck: newLineup,
      slot: newSlot,
      notes: 'Added from Screener working tab.'
    };

    setRows(prev => [newRow, ...prev]);
    setNewFixture('');
    setIsAddOpen(false);
  };

  const filteredRows = rows.filter(r => {
    if (filterBetOnly && r.decision !== 'BET') return false;
    if (categoryFilter !== 'ALL' && r.marketCategory !== categoryFilter) return false;
    return true;
  });

  const betCount = rows.filter(r => r.decision === 'BET').length;

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Main Working Tab (Screener)</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Paddy Power Fixture Screener
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Enter fixture, market, Paddy Power odds and your model probability. 
              The screener computes implied probability, fair odds and edge. A row only qualifies as 
              <span className="text-emerald-400 font-bold ml-1">BET</span> if odds are in range [{settings.oddsRangeMin}-{settings.oddsRangeMax}], 
              Chaos = Y, Lineup = Y, and Edge &ge; +{settings.minEdge} pts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsAddOpen(!isAddOpen)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Fixture</span>
            </button>

            <button
              onClick={onCombineBets}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm shadow-emerald-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Build 0.5 (1.50) Daily Slates</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterBetOnly(!filterBetOnly)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors border ${
                filterBetOnly
                  ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {filterBetOnly ? 'Showing BET Rows Only' : `Show All (${rows.length})`}
            </button>

            <div className="h-5 w-px bg-slate-800 hidden sm:block"></div>

            <div className="flex flex-wrap items-center gap-1">
              {['ALL', 'Goals', 'Double Chance', 'GK Saves', 'Corners', 'Team Goals'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    categoryFilter === cat
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Qualified BET Rows: <strong className="text-emerald-400">{betCount}</strong> / {rows.length}
          </div>
        </div>

        {/* Add Row Form Drawer */}
        {isAddOpen && (
          <form onSubmit={handleAddRow} className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Fixture</label>
              <input
                type="text"
                placeholder="e.g. Arsenal vs Everton"
                value={newFixture}
                onChange={e => setNewFixture(e.target.value)}
                required
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">League</label>
              <input
                type="text"
                placeholder="e.g. Premier League"
                value={newLeague}
                onChange={e => setNewLeague(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Market</label>
              <select
                value={newMarket}
                onChange={e => {
                  setNewMarket(e.target.value);
                  if (e.target.value.includes('Over 1.5') || e.target.value.includes('Over 2.5')) setNewCategory('Goals');
                  else if (e.target.value.includes('Double Chance')) setNewCategory('Double Chance');
                  else if (e.target.value.includes('Goalkeeper')) setNewCategory('GK Saves');
                  else if (e.target.value.includes('Corners')) setNewCategory('Corners');
                  else if (e.target.value.includes('Team to Score')) setNewCategory('Team Goals');
                }}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                <option value="Over 1.5 Match Goals">Over 1.5 Match Goals</option>
                <option value="Over 2.5 Match Goals">Over 2.5 Match Goals</option>
                <option value="Double Chance (1X)">Double Chance (1X)</option>
                <option value="Double Chance (X2)">Double Chance (X2)</option>
                <option value="Team to Score 2+ (Over 1.5)">Team to Score 2+ (Over 1.5)</option>
                <option value="Goalkeeper Saves Over 2.5">Goalkeeper Saves Over 2.5</option>
                <option value="Match Corners Over 7.5">Match Corners Over 7.5</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">PP Odds</label>
                <input
                  type="number"
                  step="0.01"
                  min="1.01"
                  max="5.0"
                  value={newOdds}
                  onChange={e => setNewOdds(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Model Prob (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="100"
                  value={newModelProb}
                  onChange={e => setNewModelProb(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>
            </div>

            <div className="sm:col-span-4 flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-3 py-1.5 text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg"
              >
                Save Row
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Spreadsheet Main Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Decision</th>
                <th className="py-3 px-3">Date/Time</th>
                <th className="py-3 px-3">Fixture</th>
                <th className="py-3 px-3">Market</th>
                <th className="py-3 px-3 text-right">PP Odds</th>
                <th className="py-3 px-3 text-right">Model %</th>
                <th className="py-3 px-3 text-right">Implied %</th>
                <th className="py-3 px-3 text-right">Fair Odds</th>
                <th className="py-3 px-3 text-right">Edge (pts)</th>
                <th className="py-3 px-3 text-center">Chaos (Y/N)</th>
                <th className="py-3 px-3 text-center">Lineup (Y/N)</th>
                <th className="py-3 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono tabular-nums">
              {filteredRows.map(row => {
                const isBet = row.decision === 'BET';
                const isRow5 = row.id === 'row-5';

                return (
                  <tr
                    key={row.id}
                    className={`transition-colors ${
                      isBet
                        ? 'bg-emerald-950/20 hover:bg-emerald-950/30'
                        : 'hover:bg-slate-800/40 text-slate-400'
                    }`}
                  >
                    {/* Decision Badge */}
                    <td className="py-3 px-3 font-sans">
                      {isBet ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500 text-slate-950">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>BET #{row.rank}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-400" title={row.skipReason}>
                          <XCircle className="w-3 h-3" />
                          <span>SKIP</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 font-sans text-slate-300">
                      {row.date} {row.time && `· ${row.time}`}
                    </td>

                    <td className="py-3 px-3 font-sans">
                      <div className="font-bold text-white">{row.fixture}</div>
                      <div className="text-[11px] text-slate-400">{row.league}</div>
                      {isRow5 && (
                        <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">
                          *Row 5 made-up example (click trash to overwrite/delete)
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-3 font-sans">
                      <span className="font-medium text-slate-200">{row.market}</span>
                      <div className="text-[10px] text-slate-500">{row.marketCategory}</div>
                    </td>

                    {/* Paddy Power Odds */}
                    <td className="py-3 px-3 text-right font-bold text-white">
                      {formatOdds(row.odds, oddsFormat)}
                    </td>

                    {/* Model Probability */}
                    <td className="py-3 px-3 text-right font-semibold text-emerald-400">
                      {row.modelProb.toFixed(1)}%
                    </td>

                    {/* Implied Probability (1/Odds) */}
                    <td className="py-3 px-3 text-right text-slate-400">
                      {row.impliedProb?.toFixed(1)}%
                    </td>

                    {/* Fair Odds (100/Model) */}
                    <td className="py-3 px-3 text-right text-slate-300">
                      {row.fairOdds?.toFixed(2)}
                    </td>

                    {/* Edge (Model - Implied) */}
                    <td className={`py-3 px-3 text-right font-bold ${
                      (row.edge || 0) >= settings.minEdge ? 'text-amber-400' : 'text-slate-500'
                    }`}>
                      {row.edge !== undefined && row.edge > 0 ? `+${row.edge.toFixed(1)}` : row.edge?.toFixed(1)}
                    </td>

                    {/* Chaos Check Toggle (Y/N) */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleToggleChaos(row.id)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono transition-colors ${
                          row.chaosCheck === 'Y'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                        title="Click to toggle Chaos check (Y = passed, N = cup tie/derby/dead game)"
                      >
                        {row.chaosCheck}
                      </button>
                    </td>

                    {/* Lineup Check Toggle (Y/N) */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleToggleLineup(row.id)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono transition-colors ${
                          row.lineupCheck === 'Y'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                        title="Click to toggle Lineup check (Y = keeper/striker confirmed 60m pre-KO)"
                      >
                        {row.lineupCheck}
                      </button>
                    </td>

                    {/* Actions: Delete Row */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        title={isRow5 ? 'Delete/Overwrite made-up Row 5' : 'Delete row'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Notes on Screener Rules */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Screener Evaluation Rule:</strong> Row = <code>BET</code> only when Odds &in; [{settings.oddsRangeMin}-{settings.oddsRangeMax}], Chaos = Y, Lineup = Y, and Edge &ge; +{settings.minEdge} pts. Ranked by Edge descending.
            </span>
          </div>

          <div className="text-[11px] text-slate-500 shrink-0 font-mono">
            {betCount} Bets Qualified
          </div>
        </div>
      </div>
    </div>
  );
};
