import React from 'react';
import { OddsFormat, AppTab } from '../types/betting';
import { Sparkles, SlidersHorizontal, Table, Filter, Layers, ShieldCheck, Settings } from 'lucide-react';

interface HeaderProps {
  oddsFormat: OddsFormat;
  setOddsFormat: (fmt: OddsFormat) => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onCombineBets: () => void;
  betCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  oddsFormat,
  setOddsFormat,
  activeTab,
  setActiveTab,
  onCombineBets,
  betCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-slate-950 font-black text-lg shadow-sm shadow-emerald-500/20">
              P
            </div>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('screener'); }}
              className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5"
            >
              <span>Paddy Power</span>
              <span className="text-emerald-400 font-medium text-sm">1.50 Rollover Bot</span>
            </a>
          </div>

          {/* Zone 2: 6 spreadsheet tabs */}
          <nav className="hidden md:flex items-center gap-5 text-xs lg:text-sm font-medium">
            <button
              onClick={() => setActiveTab('screener')}
              className={`transition-colors py-1 flex items-center gap-1 ${
                activeTab === 'screener'
                  ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Screener</span>
              {betCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-emerald-500 text-slate-950 font-bold">
                  {betCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('funnel')}
              className={`transition-colors py-1 ${
                activeTab === 'funnel'
                  ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Funnel
            </button>

            <button
              onClick={() => setActiveTab('markets')}
              className={`transition-colors py-1 ${
                activeTab === 'markets'
                  ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Markets
            </button>

            <button
              onClick={() => setActiveTab('rollover')}
              className={`transition-colors py-1 ${
                activeTab === 'rollover'
                  ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Rollover (10x)
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              className={`transition-colors py-1 ${
                activeTab === 'rules'
                  ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Rules
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`transition-colors py-1 ${
                activeTab === 'settings'
                  ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Settings
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Odds format selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-md p-0.5 text-xs font-mono">
              <button
                onClick={() => setOddsFormat('decimal')}
                className={`px-2 py-1 rounded transition-colors ${
                  oddsFormat === 'decimal' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Decimal Odds e.g. 1.50"
              >
                1.50
              </button>
              <button
                onClick={() => setOddsFormat('fractional')}
                className={`px-2 py-1 rounded transition-colors ${
                  oddsFormat === 'fractional' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Fractional Odds e.g. 1/2"
              >
                1/2
              </button>
              <button
                onClick={() => setOddsFormat('american')}
                className={`px-2 py-1 rounded transition-colors ${
                  oddsFormat === 'american' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="American Odds e.g. -200"
              >
                -200
              </button>
            </div>

            {/* Combine into 1.50 Slips Button */}
            <button
              onClick={onCombineBets}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm shadow-emerald-500/20 whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Build 1.50 Rollover Bet</span>
              <span className="sm:hidden">1.50 Bet</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
