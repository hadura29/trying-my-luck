import { ScreenerRow, SettingsConfig, FunnelStep, MarketReliabilityItem } from '../types/betting';

export const DEFAULT_SETTINGS: SettingsConfig = {
  oddsRangeMin: 1.15,
  oddsRangeMax: 1.60,
  targetOdds: 1.50,
  minEdge: 5.0, // 5 percentage points
  initialStake: 20, // £20
  stopLossPercent: 20, // 20%
  rolloverSteps: 10,
  boardFixturesWeekend: 150,
  boardFixturesWeekday: 50,
  defaultLegWinRate: 85, // 85% per-leg
};

export const INITIAL_SCREENER_ROWS: ScreenerRow[] = [
  {
    id: 'row-1',
    date: '03 Oct',
    time: '12:30',
    fixture: 'Celtic vs St. Johnstone',
    league: 'Scottish Premiership',
    market: 'Home Team to Score 2+ (Over 1.5)',
    marketCategory: 'Team Goals',
    odds: 1.25,
    modelProb: 89.0,
    chaosCheck: 'Y',
    lineupCheck: 'Y',
    slot: 'morning',
    notes: 'Celtic average 2.8 goals/home game at Celtic Park. Top scorers start.'
  },
  {
    id: 'row-2',
    date: '03 Oct',
    time: '12:30',
    fixture: 'Leeds United vs Plymouth',
    league: 'EFL Championship',
    market: 'Over 1.5 Match Goals',
    marketCategory: 'Goals',
    odds: 1.18,
    modelProb: 91.0,
    chaosCheck: 'Y',
    lineupCheck: 'Y',
    slot: 'morning',
    notes: 'Leeds high home xG; Plymouth conceded 2+ in 7 of 8 away matches.'
  },
  {
    id: 'row-3',
    date: '03 Oct',
    time: '15:00',
    fixture: 'Manchester City vs Ipswich Town',
    league: 'Premier League',
    market: 'Over 1.5 Match Goals',
    marketCategory: 'Goals',
    odds: 1.16,
    modelProb: 94.0,
    chaosCheck: 'Y',
    lineupCheck: 'Y',
    slot: 'afternoon',
    notes: 'Haaland starting; Ipswich lowest defensive recovery distance.'
  },
  {
    id: 'row-4',
    date: '03 Oct',
    time: '15:00',
    fixture: 'Bayern Munich vs Augsburg',
    league: 'Bundesliga',
    market: 'Bayern Munich 1X Double Chance',
    marketCategory: 'Double Chance',
    odds: 1.20,
    modelProb: 92.5,
    chaosCheck: 'Y',
    lineupCheck: 'Y',
    slot: 'afternoon',
    notes: 'Bayern unbeaten at home in 15 domestic fixtures; zero injury flags.'
  },
  {
    id: 'row-5',
    date: '03 Oct',
    time: '15:00',
    fixture: 'Made-Up Example Match vs Demo FC',
    league: 'Test League (Row 5 Example)',
    market: 'Over 1.5 Match Goals',
    marketCategory: 'Goals',
    odds: 1.22,
    modelProb: 88.0,
    chaosCheck: 'Y',
    lineupCheck: 'Y',
    slot: 'afternoon',
    notes: 'Row 5 is a made-up example from the spreadsheet. Overwrite or delete it.'
  },
  {
    id: 'row-6',
    date: '03 Oct',
    time: '15:00',
    fixture: 'Ipswich Goalkeeper vs Man City',
    league: 'Premier League',
    market: 'Goalkeeper Saves Over 2.5',
    marketCategory: 'GK Saves',
    odds: 1.25,
    modelProb: 88.0,
    chaosCheck: 'Y',
    lineupCheck: 'Y',
    slot: 'afternoon',
    notes: 'City generate 8.4 shots on target per 90; opposition keeper averages 4.2 saves.'
  },
  {
    id: 'row-7',
    date: '03 Oct',
    time: '15:00',
    fixture: 'Wealdstone vs Carlisle',
    league: 'England National League',
    market: 'Over 1.5 Match Goals',
    marketCategory: 'Goals',
    odds: 1.15,
    modelProb: 81.0,
    chaosCheck: 'Y',
    lineupCheck: 'N', // Lineup not confirmed yet
    slot: 'afternoon',
    notes: 'High goal average but away striker doubtful; failed lineup check.'
  },
  {
    id: 'row-8',
    date: '03 Oct',
    time: '17:30',
    fixture: 'Arsenal vs Everton',
    league: 'Premier League',
    market: 'Arsenal 1X Double Chance',
    marketCategory: 'Double Chance',
    odds: 1.22,
    modelProb: 90.0,
    chaosCheck: 'Y',
    lineupCheck: 'Y',
    slot: 'teatime',
    notes: 'Arsenal have conceded 0.61 xGA at Emirates; Dyche low possession block.'
  },
  {
    id: 'row-9',
    date: '03 Oct',
    time: '17:30',
    fixture: 'Bayer Leverkusen vs Heidenheim',
    league: 'Bundesliga',
    market: 'Match Corners Over 7.5',
    marketCategory: 'Corners',
    odds: 1.24,
    modelProb: 87.0,
    chaosCheck: 'Y',
    lineupCheck: 'Y',
    slot: 'teatime',
    notes: 'Alonso wingbacks Frimpong and Grimaldo generate 6.8 corners per match alone.'
  },
  {
    id: 'row-10',
    date: '03 Oct',
    time: '19:45',
    fixture: 'Inter Milan vs Monza',
    league: 'Serie A',
    market: 'Over 1.5 Match Goals',
    marketCategory: 'Goals',
    odds: 1.20,
    modelProb: 89.0,
    chaosCheck: 'Y',
    lineupCheck: 'Y',
    slot: 'evening',
    notes: 'Inter scored in 96% of home matches; Monza conceded first in 8 of last 9.'
  },
  {
    id: 'row-11',
    date: '03 Oct',
    time: '20:00',
    fixture: 'Real Madrid vs Las Palmas',
    league: 'La Liga',
    market: 'Real Madrid 1X Double Chance',
    marketCategory: 'Double Chance',
    odds: 1.18,
    modelProb: 93.0,
    chaosCheck: 'Y',
    lineupCheck: 'Y',
    slot: 'evening',
    notes: 'Bernabéu fortress; Las Palmas 0 wins away against top 4.'
  },
  {
    id: 'row-12',
    date: '03 Oct',
    time: '20:45',
    fixture: 'Turkey vs France',
    league: 'UEFA Nations League',
    market: 'Over 1.5 Match Goals',
    marketCategory: 'Goals',
    odds: 1.16,
    modelProb: 87.0,
    chaosCheck: 'Y',
    lineupCheck: 'Y',
    slot: 'evening',
    notes: 'High probability international clash; 87% model confidence.'
  },
  {
    id: 'row-13',
    date: '04 Oct',
    time: '14:00',
    fixture: 'Dorking Wanderers vs Chatham Town',
    league: 'FA Cup',
    market: 'Over 1.5 Match Goals',
    marketCategory: 'Goals',
    odds: 1.14,
    modelProb: 80.0,
    chaosCheck: 'N', // Cup ties are flagged chaos!
    lineupCheck: 'Y',
    slot: 'afternoon',
    notes: 'Cup tie volatility trigger: Step 2 cut chaos excludes cup ties for rollover.'
  },
  {
    id: 'row-14',
    date: '04 Oct',
    time: '15:00',
    fixture: 'Cray Wanderers vs Chippenham Town',
    league: 'FA Cup',
    market: 'Over 1.5 Match Goals',
    marketCategory: 'Goals',
    odds: 1.15,
    modelProb: 90.0,
    chaosCheck: 'N', // Cup ties are flagged chaos!
    lineupCheck: 'Y',
    slot: 'afternoon',
    notes: 'Cup tie volatility trigger; rule states avoid non-league cup fixtures.'
  },
  {
    id: 'row-15',
    date: '03 Oct',
    time: '22:00',
    fixture: 'Flamengo vs Criciúma',
    league: 'Brasileirão',
    market: 'Flamengo 1X Double Chance',
    marketCategory: 'Double Chance',
    odds: 1.20,
    modelProb: 92.0,
    chaosCheck: 'Y',
    lineupCheck: 'Y',
    slot: 'latenight',
    notes: 'Maracanã fortress; Flamengo undefeated at home in 14 matches.'
  },
  {
    id: 'row-16',
    date: '03 Oct',
    time: '23:30',
    fixture: 'Inter Miami vs Toronto FC',
    league: 'MLS',
    market: 'Over 1.5 Match Goals',
    marketCategory: 'Goals',
    odds: 1.18,
    modelProb: 90.0,
    chaosCheck: 'Y',
    lineupCheck: 'Y',
    slot: 'latenight',
    notes: 'Messi and Suarez starting at Chase Stadium; 100% over 1.5 season record.'
  }
];

export const MARKETS_RELIABILITY_DATA: MarketReliabilityItem[] = [
  {
    tier: 1,
    tierName: 'Golden Core (Ultra Low-Variance)',
    marketName: 'Over 1.5 Match Goals',
    typicalOdds: '1.14 - 1.25',
    baselineHitRate: '78% - 84%',
    varianceLevel: 'Ultra-Low',
    suitabilityForRollover: 'Primary Rollover Engine',
    goldenRule: 'Require model probability >= 80%. Never bet in teams with xG under 1.1/game.'
  },
  {
    tier: 1,
    tierName: 'Golden Core (Ultra Low-Variance)',
    marketName: 'Double Chance (1X or X2)',
    typicalOdds: '1.18 - 1.28',
    baselineHitRate: '82% - 88%',
    varianceLevel: 'Ultra-Low',
    suitabilityForRollover: 'Primary Rollover Engine',
    goldenRule: 'Only for elite home teams or dominant away powerhouses with pristine defensive record.'
  },
  {
    tier: 1,
    tierName: 'Golden Core (Ultra Low-Variance)',
    marketName: 'Asian Handicap (+1.5 or +2.0)',
    typicalOdds: '1.20 - 1.30',
    baselineHitRate: '80% - 86%',
    varianceLevel: 'Ultra-Low',
    suitabilityForRollover: 'Excellent Alternative',
    goldenRule: 'Gives the underdog a 2-goal cushion against defensive heavy favorites.'
  },
  {
    tier: 2,
    tierName: 'Secondary Banker (Low-Variance)',
    marketName: 'Team to Score 2+ Goals (Over 1.5 Team Goals)',
    typicalOdds: '1.30 - 1.50',
    baselineHitRate: '72% - 78%',
    varianceLevel: 'Low',
    suitabilityForRollover: 'Valid as Single ~1.50 Bet',
    goldenRule: 'Use for top 3 European home sides playing bottom 4 clubs (e.g. Celtic, Bayern, City).'
  },
  {
    tier: 2,
    tierName: 'Secondary Banker (Low-Variance)',
    marketName: 'Goalkeeper Saves Over 2.5 / 3.5',
    typicalOdds: '1.25 - 1.45',
    baselineHitRate: '75% - 82%',
    varianceLevel: 'Low',
    suitabilityForRollover: 'High-Value Spot Selection',
    goldenRule: 'Match an underdog goalkeeper facing high-volume shooting offenses (Man City, Real Madrid).'
  },
  {
    tier: 3,
    tierName: 'Conditional (Moderate-Variance)',
    marketName: 'Match Corners Over 7.5 / Over 8.5',
    typicalOdds: '1.22 - 1.40',
    baselineHitRate: '70% - 76%',
    varianceLevel: 'Moderate',
    suitabilityForRollover: 'Selective Use Only',
    goldenRule: 'Requires two teams with heavy crossing fullbacks and outside wingers (e.g. Leverkusen).'
  },
  {
    tier: 3,
    tierName: 'Conditional (Moderate-Variance)',
    marketName: 'Over 2.5 Match Goals',
    typicalOdds: '1.35 - 1.65',
    baselineHitRate: '60% - 68%',
    varianceLevel: 'Moderate',
    suitabilityForRollover: 'Riskier Single Leg',
    goldenRule: 'Only when combined xG > 3.4 (e.g. PSV Eindhoven or German Bundesliga transition games).'
  },
  {
    tier: 4,
    tierName: 'Strictly Avoid (High-Variance)',
    marketName: 'Total Match Cards / Booking Points',
    typicalOdds: '1.30 - 1.85',
    baselineHitRate: '50% - 62%',
    varianceLevel: 'High (Avoid)',
    suitabilityForRollover: 'PROHIBITED IN 10X ROLLOVER',
    goldenRule: 'Too sensitive to referee personality, early warnings, and blowouts. Stress trigger!'
  }
];

export function computeScreenerRows(
  rows: ScreenerRow[],
  settings: SettingsConfig
): ScreenerRow[] {
  return rows.map(row => {
    // 1. Implied Probability = 1 / Odds * 100
    const impliedProb = Number(((1 / (row.odds || 1.01)) * 100).toFixed(1));

    // 2. Fair Odds = 100 / Model Probability
    const fairOdds = Number(((100 / Math.max(0.1, row.modelProb || 50)) ).toFixed(2));

    // 3. Edge = Model Probability - Implied Probability (in percentage points)
    const edge = Number((row.modelProb - impliedProb).toFixed(1));

    // 4. Decision Rule:
    // A row ONLY gets BET if:
    // - Odds are in target range [oddsRangeMin, oddsRangeMax]
    // - Chaos check is 'Y'
    // - Lineup check is 'Y'
    // - Edge is at least minEdge (default 5.0 points)
    const inOddsRange = row.odds >= settings.oddsRangeMin && row.odds <= settings.oddsRangeMax;
    const chaosPass = row.chaosCheck === 'Y';
    const lineupPass = row.lineupCheck === 'Y';
    const edgePass = edge >= settings.minEdge;

    let decision: 'BET' | 'SKIP' = 'SKIP';
    let skipReason = '';

    if (!inOddsRange) {
      skipReason = `Odds (${row.odds}) outside [${settings.oddsRangeMin} - ${settings.oddsRangeMax}]`;
    } else if (!chaosPass) {
      skipReason = 'Chaos check failed (Cup tie, derby, or dead rubber)';
    } else if (!lineupPass) {
      skipReason = 'Lineup check failed (60m pre-KO news pending)';
    } else if (!edgePass) {
      skipReason = `Edge (+${edge} pts) < minimum +${settings.minEdge} pts`;
    } else {
      decision = 'BET';
      skipReason = `Passes all 4 criteria (+${edge} pts edge)`;
    }

    return {
      ...row,
      impliedProb,
      fairOdds,
      edge,
      decision,
      skipReason
    };
  }).sort((a, b) => {
    // Sort BET rows first, ranked by edge descending
    if (a.decision === 'BET' && b.decision !== 'BET') return -1;
    if (a.decision !== 'BET' && b.decision === 'BET') return 1;
    return (b.edge || 0) - (a.edge || 0);
  }).map((row, index) => ({
    ...row,
    rank: row.decision === 'BET' ? index + 1 : undefined
  }));
}

export function computeFunnelSteps(
  settings: SettingsConfig,
  isWeekend: boolean
): FunnelStep[] {
  const boardFixtures = isWeekend ? settings.boardFixturesWeekend : settings.boardFixturesWeekday;

  // Exact step definition from the user's uploaded spreadsheet:
  // Step 1: Pull the board (100% low, 100% high)
  // Step 2: Cut chaos (50% low, 50% high)
  // Step 3: Data check (20% low, 20% high)
  // Step 4: Model price (5% low, 10% high)
  // Step 5: Lineup check (2.0 low, 6.0 high)

  return [
    {
      stepNumber: 1,
      name: '1. Pull the board',
      whatYouDo: `List every fixture with its price in your target range (${settings.oddsRangeMin.toFixed(2)}-${settings.oddsRangeMax.toFixed(2)})`,
      survivesLowPct: 100,
      survivesHighPct: 100,
      fixturesLow: Number((boardFixtures * 1.0).toFixed(1)),
      fixturesHigh: Number((boardFixtures * 1.0).toFixed(1))
    },
    {
      stepNumber: 2,
      name: '2. Cut chaos',
      whatYouDo: 'Remove cup ties, derbies, rotation spots, early/late-season dead games, thin-data leagues',
      survivesLowPct: 50,
      survivesHighPct: 50,
      fixturesLow: Number((boardFixtures * 0.5).toFixed(1)),
      fixturesHigh: Number((boardFixtures * 0.5).toFixed(1))
    },
    {
      stepNumber: 3,
      name: '3. Data check',
      whatYouDo: 'Compare xG for/against, last 8-10 games (FBref, Understat), plus home/away splits',
      survivesLowPct: 20,
      survivesHighPct: 20,
      fixturesLow: Number((boardFixtures * 0.2).toFixed(1)),
      fixturesHigh: Number((boardFixtures * 0.2).toFixed(1))
    },
    {
      stepNumber: 4,
      name: '4. Model price',
      whatYouDo: 'Convert your estimated probability to fair odds and compare with Paddy Power',
      survivesLowPct: 5,
      survivesHighPct: 10,
      fixturesLow: Number((boardFixtures * 0.05).toFixed(1)),
      fixturesHigh: Number((boardFixtures * 0.10).toFixed(1))
    },
    {
      stepNumber: 5,
      name: '5. Lineup check',
      whatYouDo: 'About 60 minutes before kick-off: injuries, keeper, striker, weather',
      survivesLowPct: 0,
      survivesHighPct: 0,
      fixturesLow: isWeekend ? 2.0 : 1.0,
      fixturesHigh: isWeekend ? 6.0 : 3.0
    }
  ];
}

// Combine top screened BET rows into 0.5 (1.50) odds safe combinations
export function buildRolloverSlatesFromScreener(
  rows: ScreenerRow[],
  targetOdds: number = 1.50,
  isWeekend: boolean = true
): {
  morningAcca: { legs: ScreenerRow[]; totalOdds: number; prob: number; title: string };
  afternoonAcca: { legs: ScreenerRow[]; totalOdds: number; prob: number; title: string };
  eveningAcca: { legs: ScreenerRow[]; totalOdds: number; prob: number; title: string };
  teatimeAcca?: { legs: ScreenerRow[]; totalOdds: number; prob: number; title: string };
  latenightAcca?: { legs: ScreenerRow[]; totalOdds: number; prob: number; title: string };
} {
  const betRows = rows.filter(r => r.decision === 'BET');

  const getSlotLegs = (slotKey: 'morning' | 'afternoon' | 'teatime' | 'evening' | 'latenight') => {
    const slotMatches = betRows.filter(r => r.slot === slotKey);
    const candidates = slotMatches.length >= 2 ? slotMatches : betRows;

    // Pick top 2 safest legs that combine to ~1.48 - 1.55
    const leg1 = candidates[0] || rows[0];
    const leg2 = candidates[1] || rows[1];

    const totalOdds = Number((leg1.odds * (leg2?.odds || 1.25)).toFixed(2));
    const combinedProb = Number(((leg1.modelProb / 100) * ((leg2?.modelProb || 85) / 100) * 100).toFixed(1));

    return {
      legs: [leg1, leg2].filter(Boolean),
      totalOdds,
      prob: combinedProb,
      title: `${slotKey.toUpperCase()} 1.50 Banker Pair`
    };
  };

  return {
    morningAcca: getSlotLegs('morning'),
    afternoonAcca: getSlotLegs('afternoon'),
    eveningAcca: getSlotLegs('evening'),
    ...(isWeekend && {
      teatimeAcca: getSlotLegs('teatime'),
      latenightAcca: getSlotLegs('latenight')
    })
  };
}
