import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Scale, Target, Ban, Compass } from 'lucide-react';

export const RulesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Core Philosophy & Capital Preservation</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          The 10x Rollover Staking & No-Stress Rules
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          The difference between a stressed punter and a profitable operator is disciplined risk governance. 
          Follow these 5 non-negotiable rules on every leg of the rollover.
        </p>
      </div>

      {/* 5 Non-Negotiable Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rule 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center font-mono text-xs text-emerald-400">
              1
            </span>
            <span>Accept the Risk — Do Not Deny It</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            There is no such thing as a "100% sure thing" in football. Even an 85% probability leg has a 15% failure rate. 
            The goal is not to eliminate risk (impossible), but to strictly ensure you only bet when the mathematical edge is in your favor (+5 pts over bookmaker implied odds).
          </p>
        </div>

        {/* Rule 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center font-mono text-xs text-emerald-400">
              2
            </span>
            <span>Be Selective: Zero is a Valid Result</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Do not bet every day. If Tuesday's board only has thin cup ties, dead rubbers, or volatile rivalries, the correct action is <strong>NO BET</strong>. 
            Passing on a slate preserves 100% of your capital for prime weekend fixtures.
          </p>
        </div>

        {/* Rule 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center font-mono text-xs text-emerald-400">
              3
            </span>
            <span>Small Starting Stakes (1–3% Bankroll)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Never start a 10x rollover with more than 1–3% of your overall sports betting bankroll (e.g. £20 on a £1,000 bankroll). 
            Because 10 consecutive wins will return ~57.7x, small initial stakes generate substantial payouts while making losses painless.
          </p>
        </div>

        {/* Rule 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center font-mono text-xs text-emerald-400">
              4
            </span>
            <span>Strict Stop-Loss & Partial Profit Banking</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Set a maximum acceptable drawdown (e.g. 20% of your rollover bankroll) and halt betting immediately if hit. 
            Once you cross Leg 4 or 5 (growing £20 into £100–£150), withdraw your initial £20 principal to play risk-free with house money.
          </p>
        </div>

        {/* Rule 5 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2 md:col-span-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center font-mono text-xs text-emerald-400">
              5
            </span>
            <span>Pre-Kickoff Lineup Gate (60 Minutes Out)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Never lock a rollover leg without verified team sheets. If the manager rests their top striker, drops their first-choice goalkeeper, or switches to a 5-man defensive backline, the Over 1.5 probability plummets. 
            If the Lineup Check is not 'Y', mark the row <strong>SKIP</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
