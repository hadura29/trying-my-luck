import React, { useState, useMemo } from 'react';
import { OddsFormat, AppTab, SettingsConfig, ScreenerRow } from './types/betting';
import { DEFAULT_SETTINGS, INITIAL_SCREENER_ROWS, computeScreenerRows } from './data/spreadsheetData';
import { Header } from './components/Header';
import { ScreenerTab } from './components/ScreenerTab';
import { FunnelTab } from './components/FunnelTab';
import { MarketsTab } from './components/MarketsTab';
import { RolloverTab } from './components/RolloverTab';
import { RulesTab } from './components/RulesTab';
import { SettingsTab } from './components/SettingsTab';
import { RolloverSlatesModal } from './components/RolloverSlatesModal';
import { Sparkles, TrendingUp, ShieldCheck, Layers, Filter, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('screener');
  const [oddsFormat, setOddsFormat] = useState<OddsFormat>('decimal');
  const [isWeekend, setIsWeekend] = useState<boolean>(true);

  // Settings driving all spreadsheet tab calculations
  const [settings, setSettings] = useState<SettingsConfig>(DEFAULT_SETTINGS);

  // Screener rows (working tab)
  const [rawRows, setRawRows] = useState<ScreenerRow[]>(INITIAL_SCREENER_ROWS);

  // Modal for combined 1.50 slates
  const [isSlatesModalOpen, setIsSlatesModalOpen] = useState<boolean>(false);

  // Dynamically compute implied probabilities, fair odds, edge, and BET/SKIP decisions
  const evaluatedRows = useMemo(() => {
    return computeScreenerRows(rawRows, settings);
  }, [rawRows, settings]);

  const betCount = evaluatedRows.filter(r => r.decision === 'BET').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header with 6-Tab Navigation */}
      <Header
        oddsFormat={oddsFormat}
        setOddsFormat={setOddsFormat}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCombineBets={() => setIsSlatesModalOpen(true)}
        betCount={betCount}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Rollover Status Telemetry Strip */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              PADDY POWER 0.5 (1.50) ROLLOVER BOT
            </span>
            <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
            <span className="text-slate-400">
              Target: <strong className="text-white font-mono">{settings.targetOdds.toFixed(2)}</strong> odds ({settings.rolloverSteps} Steps &rarr; <span className="text-emerald-400 font-mono font-bold">57.7x payout</span>)
            </span>
            <span aria-hidden="true" className="text-slate-600 hidden md:inline">·</span>
            <span className="text-slate-400 hidden md:inline">
              Min Edge Filter: <strong className="text-amber-400 font-mono">+{settings.minEdge} pts</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSlatesModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold rounded-lg border border-emerald-800/60 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>View Daily 1.50 Slates ({isWeekend ? '5 Weekend' : '3 Weekday'})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Screener (Main Working Tab) */}
        {activeTab === 'screener' && (
          <ScreenerTab
            rows={evaluatedRows}
            setRows={setRawRows}
            settings={settings}
            oddsFormat={oddsFormat}
            onCombineBets={() => setIsSlatesModalOpen(true)}
          />
        )}

        {/* Tab 2: Daily Funnel (All Leagues) */}
        {activeTab === 'funnel' && (
          <FunnelTab
            settings={settings}
            isWeekend={isWeekend}
            setIsWeekend={setIsWeekend}
          />
        )}

        {/* Tab 3: Markets Ranked by Reliability */}
        {activeTab === 'markets' && <MarketsTab />}

        {/* Tab 4: 10x Rollover Compounding Engine */}
        {activeTab === 'rollover' && (
          <RolloverTab
            settings={settings}
            oddsFormat={oddsFormat}
          />
        )}

        {/* Tab 5: Staking & No-Stress Rules */}
        {activeTab === 'rules' && <RulesTab />}

        {/* Tab 6: Settings (Editable Blue Cells) */}
        {activeTab === 'settings' && (
          <SettingsTab
            settings={settings}
            setSettings={setSettings}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-5 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Paddy Power 0.5 Rollover 10x Model</span>
            <span aria-hidden="true">·</span>
            <span>6-Tab Decision Spreadsheet Architecture (Screener, Funnel, Markets, Rollover, Rules, Settings)</span>
          </div>
          <div className="text-[11px]">
            18+ Gamble Responsibly · Model probability & edge analytics for disciplined risk management
          </div>
        </div>
      </footer>

      {/* Combined 1.50 Slates Modal */}
      <RolloverSlatesModal
        isOpen={isSlatesModalOpen}
        onClose={() => setIsSlatesModalOpen(false)}
        rows={evaluatedRows}
        settings={settings}
        oddsFormat={oddsFormat}
        isWeekend={isWeekend}
        setIsWeekend={setIsWeekend}
      />
    </div>
  );
}
