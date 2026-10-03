import React, { useState } from 'react';
import { Fixture, MarketType, OddsFormat } from '../types/betting';
import { LEAGUES, FIXTURES_DATABASE } from '../data/fixtures';
import { formatOdds } from '../services/accaEngine';
import { Search, Filter, ShieldAlert, Sparkles, Check, Copy } from 'lucide-react';

interface FixtureExplorerProps {
  oddsFormat: OddsFormat;
  onSelectMarketForCustomSlip?: (fixture: Fixture, marketType: MarketType) => void;
}

export const FixtureExplorer: React.FC<FixtureExplorerProps> = ({
  oddsFormat,
  onSelectMarketForCustomSlip,
}) => {
  const [selectedLeague, setSelectedLeague] = useState<string>('All Leagues');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMarketType, setSelectedMarketType] = useState<MarketType | 'ALL'>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFixtures = FIXTURES_DATABASE.filter(f => {
    const matchesLeague = selectedLeague === 'All Leagues' || f.league === selectedLeague;
    const matchesSearch = 
      f.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.league.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLeague && matchesSearch;
  });

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Paddy Power Daily Fixtures Catalog
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live odds scanner across all domestic leagues and international tournaments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Search Box */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search team or league..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* League Dropdown */}
            <select
              value={selectedLeague}
              onChange={e => setSelectedLeague(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              {LEAGUES.map(league => (
                <option key={league} value={league}>
                  {league}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Market Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter Market:
          </span>
          {[
            { id: 'ALL', label: 'All Markets' },
            { id: 'STRAIGHT_WIN', label: 'Straight Win' },
            { id: 'OVER_0_5', label: 'Over 0.5 Goals' },
            { id: 'OVER_1_5', label: 'Over 1.5 Goals' },
            { id: 'OVER_2_5', label: 'Over 2.5 Goals' },
            { id: 'HOME_TO_SCORE', label: 'Home to Score' },
            { id: 'AWAY_TO_SCORE', label: 'Away to Score' },
            { id: 'DOUBLE_CHANCE', label: 'Double Chance' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMarketType(m.id as any)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedMarketType === m.id
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fixtures List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFixtures.map(fixture => {
          return (
            <div
              key={fixture.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800/80 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-300">{fixture.league}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-400">{fixture.kickoffTime} BST</span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(fixture.paddyCode, fixture.id)}
                    className="inline-flex items-center gap-1 font-mono text-slate-400 hover:text-emerald-400 transition-colors"
                    title="Copy Paddy Power fixture ID"
                  >
                    {copiedId === fixture.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{fixture.paddyCode}</span>
                  </button>
                </div>

                <div className="text-base font-bold text-white">
                  {fixture.homeTeam} <span className="text-slate-500 font-normal">vs</span> {fixture.awayTeam}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Venue: {fixture.venue}
                </div>

                {/* Form and key stats */}
                <div className="mt-3 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-300">
                    <strong>Trend:</strong> {fixture.homeScoredLastMatches}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    H2H: {fixture.h2hSummary}
                  </div>
                </div>
              </div>

              {/* Markets Grid */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Paddy Power Banker Markets
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(fixture.markets)
                    .filter(([type]) => selectedMarketType === 'ALL' || selectedMarketType === type)
                    .map(([type, market]) => {
                      const isHighBanker = market.bankerRating >= 95;
                      return (
                        <div
                          key={type}
                          className={`p-2 rounded-lg border text-left flex flex-col justify-between ${
                            isHighBanker
                              ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="text-[11px] font-medium truncate" title={market.label}>
                            {market.shortLabel}
                          </div>
                          <div className="flex items-baseline justify-between mt-1 font-mono">
                            <span className="text-sm font-bold text-white tabular-nums">
                              {formatOdds(market.odds, oddsFormat)}
                            </span>
                            <span className="text-[10px] text-amber-300">
                              {market.bankerRating}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
