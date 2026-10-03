export type OddsFormat = 'decimal' | 'fractional' | 'american';

export type AppTab = 'screener' | 'rollover' | 'funnel' | 'markets' | 'rules' | 'settings';

export type MarketType = 
  | 'STRAIGHT_WIN'
  | 'OVER_0_5'
  | 'OVER_1_5'
  | 'OVER_2_5'
  | 'HOME_TO_SCORE'
  | 'AWAY_TO_SCORE'
  | 'DOUBLE_CHANCE';

export interface MarketOption {
  type: MarketType;
  label: string;
  shortLabel: string;
  odds: number;
  impliedProb: number;
  bankerRating: number;
  reasoning: string;
}

export interface Fixture {
  id: string;
  paddyCode: string;
  league: string;
  leagueCountry: string;
  homeTeam: string;
  awayTeam: string;
  kickoffTime: string;
  kickoffSlot: 'morning' | 'afternoon' | 'teatime' | 'evening' | 'latenight';
  isWeekendOnly?: boolean;
  homeForm: ('W' | 'D' | 'L')[];
  awayForm: ('W' | 'D' | 'L')[];
  homeGoalsAvg: number;
  awayGoalsAvg: number;
  homeScoredLastMatches: string;
  awayScoredLastMatches: string;
  h2hSummary: string;
  markets: Record<MarketType, MarketOption>;
  venue: string;
}

export interface AccaLeg {
  id: string;
  fixtureId: string;
  fixture: Fixture;
  market: MarketOption;
  settledStatus?: 'won' | 'pending' | 'lost';
  liveScore?: string;
  matchMinute?: string;
}

export interface StatisticalModelAudit {
  dixonColesLambdaHome: number;
  dixonColesLambdaAway: number;
  homeAdvantageFactor: number;
  rhoCorrelation: number;
  monteCarloSimulations: number;
  monteCarloHitRate: number;
  poissonOver05Prob: number;
  poissonOver15Prob: number;
  poissonOver25Prob: number;
  poissonHomeScoreProb: number;
  poissonAwayScoreProb: number;
  poissonHomeWinProb: number;
  expectedValueEV: number;
  kellyFraction: number;
  topScorelines: { score: string; prob: number }[];
}

export interface AccaSlip {
  id: string;
  slotKey: 'morning' | 'afternoon' | 'teatime' | 'evening' | 'latenight';
  slotName: string;
  timeWindow: string;
  title: string;
  description: string;
  targetOdds: number;
  totalOdds: number;
  combinedProbability: number;
  legs: AccaLeg[];
  paddyPowerBookingCode: string;
  status: 'active' | 'upcoming' | 'won' | 'in_play';
  dropTime: string;
  statsHighlight: string;
  aiTacticalSummary?: string;
  statisticalAudit?: StatisticalModelAudit;
}

export interface RolloverStep {
  step: number;
  startStake: number;
  odds: number;
  expectedReturn: number;
  profit: number;
  completed: boolean;
}

export interface BotTelemetry {
  status: 'ONLINE' | 'SCANNING' | 'LOCKED';
  totalLeaguesScanned: number;
  totalFixturesEvaluated: number;
  bankersFiltered: number;
  nextDropSlot: string;
  nextDropTime: string;
  historicalAccuracyRate: number;
  currentStreak: number;
  activeMode: 'weekday' | 'weekend';
}

// 6-Tab Spreadsheet Specific Types
export interface ScreenerRow {
  id: string;
  date: string;
  time?: string;
  fixture: string;
  league: string;
  market: string;
  marketCategory: 'Goals' | 'Double Chance' | 'Corners' | 'GK Saves' | 'Cards' | 'Team Goals';
  odds: number; // Paddy Power odds, e.g. 1.20
  modelProb: number; // In percent e.g. 88.0
  chaosCheck: 'Y' | 'N'; // No cup ties, no derbies, no dead games, reliable league
  lineupCheck: 'Y' | 'N'; // Key keeper/striker confirmed starting, no injury crisis
  slot: 'morning' | 'afternoon' | 'teatime' | 'evening' | 'latenight';
  notes?: string;
  impliedProb?: number; // 1 / odds * 100
  fairOdds?: number; // 100 / modelProb
  edge?: number; // modelProb - impliedProb
  decision?: 'BET' | 'SKIP';
  skipReason?: string;
  rank?: number;
}

export interface SettingsConfig {
  oddsRangeMin: number;
  oddsRangeMax: number;
  targetOdds: number;
  minEdge: number;
  initialStake: number;
  stopLossPercent: number;
  rolloverSteps: number;
  boardFixturesWeekend: number;
  boardFixturesWeekday: number;
  defaultLegWinRate: number;
}

export interface FunnelStep {
  stepNumber: number;
  name: string;
  whatYouDo: string;
  survivesLowPct: number;
  survivesHighPct: number;
  fixturesLow: number;
  fixturesHigh: number;
}

export interface MarketReliabilityItem {
  tier: 1 | 2 | 3 | 4;
  tierName: string;
  marketName: string;
  typicalOdds: string;
  baselineHitRate: string;
  varianceLevel: 'Ultra-Low' | 'Low' | 'Moderate' | 'High (Avoid)';
  suitabilityForRollover: string;
  goldenRule: string;
}
