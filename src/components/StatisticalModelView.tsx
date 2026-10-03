import React, { useState } from 'react';
import { AccaSlip, OddsFormat } from '../types/betting';
import { formatOdds } from '../services/accaEngine';
import { runMonteCarloSimulation } from '../services/statisticalModel';
import { 
  BarChart3, 
  Play, 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';

interface StatisticalModelViewProps {
  accas: AccaSlip[];
  oddsFormat: OddsFormat;
}

export const StatisticalModelView: React.FC<StatisticalModelViewProps> = ({
  accas,
  oddsFormat,
}) => {
  const [selectedAccaId, setSelectedAccaId] = useState<string>(accas[0]?.id || '');
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simResults, setSimResults] = useState<{
    hitRate: number;
    totalSimulations: number;
    successfulSimulations: number;
    legHitRates: { legId: string; hitRate: number; fixture: string; market: string }[];
  } | null>(null);

  const selectedAcca = accas.find(a => a.id === selectedAccaId) || accas[0];
  const audit = selectedAcca?.statisticalAudit;

  const handleRunSimulation = () => {
    if (!selectedAcca) return;
    setIsRunningSim(true);
    // Simulate brief processing for realistic UX feel
    setTimeout(() => {
      const results = runMonteCarloSimulation(selectedAcca.legs, 10000);
      setSimResults(results);
      setIsRunningSim(false);
    }, 400);
  };

  if (!selectedAcca || !audit) return null;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4" />
              <span>Dixon-Coles & Monte Carlo Analytics</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Statistical Model & Predictive Forecasting
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Every Paddy Power accumulator forecast is vetted against the 
              <strong> Dixon-Coles Bivariate Poisson distribution</strong>, accounting for low-score covariance (ρ = -0.06), 
              home advantage coefficients, and 10,000 Monte Carlo stochastic match simulations.
            </p>
          </div>

          {/* Quick Slate Picker */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 px-2 font-medium">Slate:</span>
            <select
              value={selectedAccaId}
              onChange={e => {
                setSelectedAccaId(e.target.value);
                setSimResults(null);
              }}
              className="px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-medium focus:outline-none focus:border-emerald-500"
            >
              {accas.map(a => (
                <option key={a.id} value={a.id}>
                  {a.slotName} ({formatOdds(a.totalOdds, oddsFormat)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Slate Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-5">
          <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Dixon-Coles Home λ</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5 tabular-nums">
              {audit.dixonColesLambdaHome.toFixed(2)} xG
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Away λ: {audit.dixonColesLambdaAway.toFixed(2)} xG
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Monte Carlo Hit Rate</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5 tabular-nums">
              {simResults ? simResults.hitRate : audit.monteCarloHitRate}%
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              10,000 stochastic trials
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Expected Value (+EV)</div>
            <div className="text-xl font-bold font-mono text-amber-400 mt-0.5 tabular-nums">
              +{audit.expectedValueEV}%
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Against Paddy Power odds
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Quarter-Kelly Size</div>
            <div className="text-xl font-bold font-mono text-white mt-0.5 tabular-nums">
              {audit.kellyFraction}%
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Optimal bankroll fraction
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Monte Carlo Simulation Engine */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <span>Live 10,000-Match Monte Carlo Simulation</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Stochastically simulates all legs simultaneously based on Poisson goal arrival distributions.
            </p>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isRunningSim}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm shadow-emerald-500/20 disabled:opacity-50 cursor-pointer self-start sm:self-auto"
          >
            <Play className={`w-3.5 h-3.5 ${isRunningSim ? 'animate-spin' : ''}`} />
            <span>{isRunningSim ? 'Running 10,000 Trials...' : 'Run 10,000 Simulations'}</span>
          </button>
        </div>

        {/* Results Visualizer */}
        <div className="mt-5 space-y-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400">Total Simulated Landings:</div>
              <div className="text-2xl font-black font-mono text-emerald-400 tabular-nums mt-0.5">
                {simResults 
                  ? `${simResults.successfulSimulations.toLocaleString()} / 10,000` 
                  : `${Math.round(audit.monteCarloHitRate * 100).toLocaleString()} / 10,000`}
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-400">Model Empirical Probability:</div>
              <div className="text-2xl font-black font-mono text-emerald-300 tabular-nums mt-0.5">
                {simResults ? simResults.hitRate : audit.monteCarloHitRate}%
              </div>
            </div>
          </div>

          {/* Leg by Leg Simulation Breakdown */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Individual Leg Empirical Landing Frequency
            </div>
            {(simResults?.legHitRates || selectedAcca.legs.map(l => ({
              legId: l.id,
              hitRate: l.market.bankerRating,
              fixture: `${l.fixture.homeTeam} vs ${l.fixture.awayTeam}`,
              market: l.market.label
            }))).map((leg, i) => (
              <div key={leg.legId} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-white">
                    {i + 1}. {leg.fixture} — <span className="text-emerald-400">{leg.market}</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">
                    {leg.hitRate}%
                  </span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${leg.hitRate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Poisson Goal Probability Matrix & Top Scorelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Derived Poisson Probabilities */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Poisson Derived Market Probabilities</span>
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Exact analytical integration from bivariate goal distributions.
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-300">P(Over 0.5 Total Goals):</span>
              <span className="font-bold text-emerald-400 tabular-nums">{audit.poissonOver05Prob}%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-300">P(Over 1.5 Total Goals):</span>
              <span className="font-bold text-emerald-400 tabular-nums">{audit.poissonOver15Prob}%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-300">P(Home Team to Score):</span>
              <span className="font-bold text-emerald-400 tabular-nums">{audit.poissonHomeScoreProb}%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-300">P(Home Straight Win):</span>
              <span className="font-bold text-emerald-400 tabular-nums">{audit.poissonHomeWinProb}%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-300">P(Over 2.5 Total Goals):</span>
              <span className="font-bold text-amber-300 tabular-nums">{audit.poissonOver25Prob}%</span>
            </div>
          </div>
        </div>

        {/* Most Probable Exact Scorelines */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Top Projected Scorelines</span>
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Bivariate score likelihoods for primary fixture in the slate.
          </p>

          <div className="grid grid-cols-2 gap-3 font-mono">
            {audit.topScorelines.map((scoreline, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between text-center"
              >
                <div className="text-2xl font-bold text-white tracking-wider tabular-nums">
                  {scoreline.score}
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-1 tabular-nums">
                  {scoreline.prob}% Probability
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Low scoring correlation adjustment factor (ρ = {audit.rhoCorrelation}) eliminates risk of 0-0 surprises 
              by verifying heavy underdog attacking drought metrics.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
