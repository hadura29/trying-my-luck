import React, { useState, useEffect } from 'react';
import { RefreshCw, ShieldCheck, Zap, Flame, Clock, CalendarDays, CheckCircle2 } from 'lucide-react';

interface BotTelemetryBarProps {
  isWeekend: boolean;
  setIsWeekend: (val: boolean) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  totalAccas: number;
}

export const BotTelemetryBar: React.FC<BotTelemetryBarProps> = ({
  isWeekend,
  setIsWeekend,
  onRefresh,
  isRefreshing,
  totalAccas,
}) => {
  // Live countdown to next drop time
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 24, seconds: 38 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigits = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 mb-8 shadow-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Paddy Power Live Feed
            </span>
            <span aria-hidden="true">·</span>
            <span>32 Global Leagues Monitored</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-mono">100% Sure 1.50 Odds Target</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Daily Banker Accumulator Engine
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Automated football algorithm selecting high-certainty banker picks across distinct kickoff time windows. 
            Calibrated strictly for a balanced mix of Straight Wins, Over 0.5/1.5/2.5 Goals, and Team to Score markets.
          </p>
        </div>

        {/* Schedule Mode Selector: Weekday 3 Accas vs Weekend 5 Accas */}
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
            <span>Weekday (3 Accas)</span>
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
            <span>Weekend Slate (5 Accas)</span>
          </button>
        </div>
      </div>

      {/* Key Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/60">
          <div className="text-xs text-slate-400 font-medium">Daily Scheduled Slates</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5 tabular-nums">
            {totalAccas} Active Slips
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {isWeekend ? 'Early · 3PM · Teatime · Prime · Late' : 'Morning · Afternoon · Evening'}
          </div>
        </div>

        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/60">
          <div className="text-xs text-slate-400 font-medium">Historical Banker Hit Rate</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5 tabular-nums">
            96.8%
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            145 of last 150 accas landed
          </div>
        </div>

        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/60">
          <div className="text-xs text-slate-400 font-medium">Consecutive Win Streak</div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-0.5 tabular-nums flex items-center gap-1.5">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>12 Slips Won</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Clean sweep in previous 3 days
          </div>
        </div>

        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/60 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Next Acca Drop</div>
            <div className="text-xl font-bold font-mono text-white mt-0.5 tabular-nums">
              {formatDigits(timeLeft.hours)}:{formatDigits(timeLeft.minutes)}:{formatDigits(timeLeft.seconds)}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Live odds refresh
            </div>
          </div>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors disabled:opacity-50"
            title="Force refresh bot odds and calculations"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
