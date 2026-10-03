import { Fixture } from '../types/betting';

export const LEAGUES = [
  'All Leagues',
  'Premier League (ENG)',
  'Champions League (UEFA)',
  'La Liga (ESP)',
  'Serie A (ITA)',
  'Bundesliga (GER)',
  'Ligue 1 (FRA)',
  'Eredivisie (NED)',
  'EFL Championship (ENG)',
  'Primeira Liga (POR)',
  'Scottish Premiership (SCO)',
  'Brasileirão (BRA)',
  'MLS (USA)'
] as const;

export const FIXTURES_DATABASE: Fixture[] = [
  // MORNING SLOT (11:30 - 13:30)
  {
    id: 'fix-m1',
    paddyCode: 'PP-10821',
    league: 'Scottish Premiership (SCO)',
    leagueCountry: 'Scotland',
    homeTeam: 'Celtic',
    awayTeam: 'St. Johnstone',
    kickoffTime: '12:30',
    kickoffSlot: 'morning',
    homeForm: ['W', 'W', 'W', 'W', 'D'],
    awayForm: ['L', 'L', 'D', 'L', 'L'],
    homeGoalsAvg: 2.8,
    awayGoalsAvg: 0.6,
    homeScoredLastMatches: 'Scored in last 28 consecutive home matches at Celtic Park',
    awayScoredLastMatches: 'Conceded in 14 of last 15 away matches',
    h2hSummary: 'Celtic have won 9 of last 10 H2H with over 1.5 goals in 10/10 matches',
    venue: 'Celtic Park, Glasgow',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Celtic to Win (Straight Win)',
        shortLabel: 'Celtic Win',
        odds: 1.14,
        impliedProb: 87.7,
        bankerRating: 98,
        reasoning: 'Celtic average 2.8 goals/home game with 89% win rate vs bottom-half sides'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: 'Zero 0-0 draws at Celtic Park in the last 64 league matches'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.12,
        impliedProb: 89.3,
        bankerRating: 96,
        reasoning: 'Over 1.5 goals landed in 26 of Celtic’s last 27 matches'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.38,
        impliedProb: 72.5,
        bankerRating: 88,
        reasoning: 'Celtic alone produce 2.8 goals per home outing'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'Celtic to Score (Home Over 0.5)',
        shortLabel: 'Celtic to Score',
        odds: 1.04,
        impliedProb: 96.2,
        bankerRating: 99,
        reasoning: 'Celtic have scored at home in 38 straight domestic fixtures'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'St. Johnstone to Score (Away Over 0.5)',
        shortLabel: 'St. Johnstone to Score',
        odds: 2.10,
        impliedProb: 47.6,
        bankerRating: 52,
        reasoning: 'Low confidence, high variance for away side'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'Celtic or Draw (1X Double Chance)',
        shortLabel: 'Celtic 1X',
        odds: 1.03,
        impliedProb: 97.1,
        bankerRating: 99,
        reasoning: 'Celtic unbeaten in 34 consecutive home league encounters'
      }
    }
  },
  {
    id: 'fix-m2',
    paddyCode: 'PP-10822',
    league: 'Serie A (ITA)',
    leagueCountry: 'Italy',
    homeTeam: 'Atalanta',
    awayTeam: 'Empoli',
    kickoffTime: '11:30',
    kickoffSlot: 'morning',
    homeForm: ['W', 'W', 'D', 'W', 'W'],
    awayForm: ['L', 'D', 'L', 'L', 'D'],
    homeGoalsAvg: 2.3,
    awayGoalsAvg: 0.8,
    homeScoredLastMatches: 'Scored in 18 of last 19 home games across all competitions',
    awayScoredLastMatches: 'Conceded in 9 consecutive away fixtures',
    h2hSummary: 'Atalanta have won 4 of last 5 home games against Empoli with 14 goals scored',
    venue: 'Gewiss Stadium, Bergamo',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Atalanta to Win (Straight Win)',
        shortLabel: 'Atalanta Win',
        odds: 1.28,
        impliedProb: 78.1,
        bankerRating: 92,
        reasoning: 'Gasperini’s side ranks #1 in Serie A for progressive passes and box touches'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.03,
        impliedProb: 97.1,
        bankerRating: 99,
        reasoning: '99% of Atalanta fixtures this season feature at least 1 goal'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.16,
        impliedProb: 86.2,
        bankerRating: 95,
        reasoning: 'Atalanta matches average 3.1 total goals this season'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.48,
        impliedProb: 67.6,
        bankerRating: 84,
        reasoning: 'Both teams play with high lines in Bergamo morning kickoffs'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'Atalanta to Score (Home Over 0.5)',
        shortLabel: 'Atalanta to Score',
        odds: 1.06,
        impliedProb: 94.3,
        bankerRating: 98,
        reasoning: 'Atalanta generated 2.45 xG per game in last 6 home fixtures'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'Empoli to Score (Away Over 0.5)',
        shortLabel: 'Empoli to Score',
        odds: 1.68,
        impliedProb: 59.5,
        bankerRating: 68,
        reasoning: 'Moderate probability counter-attack chances'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'Atalanta or Draw (1X Double Chance)',
        shortLabel: 'Atalanta 1X',
        odds: 1.06,
        impliedProb: 94.3,
        bankerRating: 97,
        reasoning: 'Atalanta undefeated in 11 straight meetings vs bottom 6 opposition'
      }
    }
  },
  {
    id: 'fix-m3',
    paddyCode: 'PP-10823',
    league: 'EFL Championship (ENG)',
    leagueCountry: 'England',
    homeTeam: 'Leeds United',
    awayTeam: 'Plymouth Argyle',
    kickoffTime: '12:30',
    kickoffSlot: 'morning',
    homeForm: ['W', 'W', 'W', 'D', 'W'],
    awayForm: ['L', 'L', 'L', 'D', 'L'],
    homeGoalsAvg: 2.4,
    awayGoalsAvg: 0.7,
    homeScoredLastMatches: 'Unbeaten at Elland Road in 19 games with 42 goals scored',
    awayScoredLastMatches: 'Conceded 2+ goals in 7 of last 8 away trips',
    h2hSummary: 'Leeds won 3-0, 4-1 in their most recent meetings',
    venue: 'Elland Road, Leeds',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Leeds United to Win (Straight Win)',
        shortLabel: 'Leeds Win',
        odds: 1.22,
        impliedProb: 82.0,
        bankerRating: 94,
        reasoning: 'Leeds boast the strongest home xG differential (+1.62) in the division'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: '100% of Leeds games at Elland Road have produced over 0.5 goals'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.15,
        impliedProb: 87.0,
        bankerRating: 95,
        reasoning: 'Over 1.5 goals has hit in 21 of last 22 Leeds fixtures'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.45,
        impliedProb: 69.0,
        bankerRating: 85,
        reasoning: 'Plymouth away games average 3.4 total goals conceded/scored'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'Leeds United to Score (Home Over 0.5)',
        shortLabel: 'Leeds to Score',
        odds: 1.05,
        impliedProb: 95.2,
        bankerRating: 98,
        reasoning: 'Leeds have scored first half in 8 of their last 10 games'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'Plymouth to Score (Away Over 0.5)',
        shortLabel: 'Plymouth to Score',
        odds: 1.75,
        impliedProb: 57.1,
        bankerRating: 64,
        reasoning: 'Plymouth scored in 5 of last 9 away games'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'Leeds or Draw (1X Double Chance)',
        shortLabel: 'Leeds 1X',
        odds: 1.04,
        impliedProb: 96.2,
        bankerRating: 98,
        reasoning: 'Unbeaten home record remains pristine across 6 months'
      }
    }
  },

  // AFTERNOON SLOT (14:30 - 16:30)
  {
    id: 'fix-a1',
    paddyCode: 'PP-20411',
    league: 'Premier League (ENG)',
    leagueCountry: 'England',
    homeTeam: 'Manchester City',
    awayTeam: 'Ipswich Town',
    kickoffTime: '15:00',
    kickoffSlot: 'afternoon',
    homeForm: ['W', 'W', 'W', 'W', 'D'],
    awayForm: ['L', 'D', 'L', 'L', 'L'],
    homeGoalsAvg: 3.1,
    awayGoalsAvg: 0.9,
    homeScoredLastMatches: 'Scored in 34 consecutive Premier League home fixtures',
    awayScoredLastMatches: 'Failed to keep clean sheet in 19 away games',
    h2hSummary: 'Man City won previous fixture 4-1 with 78% possession',
    venue: 'Etihad Stadium, Manchester',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Manchester City to Win (Straight Win)',
        shortLabel: 'Man City Win',
        odds: 1.10,
        impliedProb: 90.9,
        bankerRating: 97,
        reasoning: 'Man City have won 18 of last 19 home games against newly promoted clubs'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.01,
        impliedProb: 99.0,
        bankerRating: 100,
        reasoning: '100% historical accuracy, lowest risk banker in global football'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.09,
        impliedProb: 91.7,
        bankerRating: 97,
        reasoning: 'Man City games at Etihad average 3.8 goals, 96% over 1.5 rate'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.28,
        impliedProb: 78.1,
        bankerRating: 90,
        reasoning: 'Haaland scoring streak combined with high Etihad goal frequency'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'Man City to Score (Home Over 0.5)',
        shortLabel: 'Man City to Score',
        odds: 1.03,
        impliedProb: 97.1,
        bankerRating: 99,
        reasoning: 'Man City scored in 100% of home games over the past 14 months'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'Ipswich to Score (Away Over 0.5)',
        shortLabel: 'Ipswich to Score',
        odds: 1.85,
        impliedProb: 54.1,
        bankerRating: 60,
        reasoning: 'Tough test against City backline'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'Man City or Draw (1X Double Chance)',
        shortLabel: 'Man City 1X',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: 'Guaranteed safety blanket on home turf'
      }
    }
  },
  {
    id: 'fix-a2',
    paddyCode: 'PP-20412',
    league: 'Bundesliga (GER)',
    leagueCountry: 'Germany',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Augsburg',
    kickoffTime: '14:30',
    kickoffSlot: 'afternoon',
    homeForm: ['W', 'W', 'W', 'D', 'W'],
    awayForm: ['L', 'L', 'W', 'L', 'D'],
    homeGoalsAvg: 3.3,
    awayGoalsAvg: 1.0,
    homeScoredLastMatches: 'Bayern scored 2+ goals in 14 of their last 15 Allianz Arena games',
    awayScoredLastMatches: 'Augsburg conceded 18 goals in their last 5 away trips to top 4',
    h2hSummary: 'Bayern have won 7 straight H2H with aggregate score 24-5',
    venue: 'Allianz Arena, Munich',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Bayern Munich to Win (Straight Win)',
        shortLabel: 'Bayern Win',
        odds: 1.15,
        impliedProb: 87.0,
        bankerRating: 96,
        reasoning: 'Kane leading European Golden Shoe pace; Augsburg bottom 3 in shots conceded'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.01,
        impliedProb: 99.0,
        bankerRating: 100,
        reasoning: 'Never finished 0-0 in modern Bundesliga H2H history'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.08,
        impliedProb: 92.6,
        bankerRating: 98,
        reasoning: 'Bundesliga highest goal average fixture (3.9 goals/match)'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.25,
        impliedProb: 80.0,
        bankerRating: 92,
        reasoning: 'Over 2.5 landed in 100% of Bayern’s last 8 domestic matches'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'Bayern Munich to Score (Home Over 0.5)',
        shortLabel: 'Bayern to Score',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: 'Bayern average 1.1 goals in the opening 30 minutes alone at home'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'Augsburg to Score (Away Over 0.5)',
        shortLabel: 'Augsburg to Score',
        odds: 1.62,
        impliedProb: 61.7,
        bankerRating: 72,
        reasoning: 'Augsburg capable of grabbing a consolation on set pieces'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'Bayern Munich or Draw (1X Double Chance)',
        shortLabel: 'Bayern 1X',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: 'Unbeaten home record in domestic league'
      }
    }
  },
  {
    id: 'fix-a3',
    paddyCode: 'PP-20413',
    league: 'Eredivisie (NED)',
    leagueCountry: 'Netherlands',
    homeTeam: 'PSV Eindhoven',
    awayTeam: 'PEC Zwolle',
    kickoffTime: '15:30',
    kickoffSlot: 'afternoon',
    homeForm: ['W', 'W', 'W', 'W', 'W'],
    awayForm: ['L', 'D', 'L', 'L', 'W'],
    homeGoalsAvg: 3.5,
    awayGoalsAvg: 0.9,
    homeScoredLastMatches: 'Scored in 41 consecutive Eredivisie fixtures',
    awayScoredLastMatches: 'Zwolle conceded in 16 straight away tests',
    h2hSummary: 'PSV have won 14 consecutive games against Zwolle',
    venue: 'Philips Stadion, Eindhoven',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'PSV Eindhoven to Win (Straight Win)',
        shortLabel: 'PSV Win',
        odds: 1.12,
        impliedProb: 89.3,
        bankerRating: 97,
        reasoning: 'PSV have 94% win rate at home in Eredivisie over the past 2 seasons'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.01,
        impliedProb: 99.0,
        bankerRating: 100,
        reasoning: '100% certainty index in attacking Dutch league'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.07,
        impliedProb: 93.5,
        bankerRating: 98,
        reasoning: 'Every single PSV home fixture this season has seen at least 2 goals'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.24,
        impliedProb: 80.6,
        bankerRating: 92,
        reasoning: 'PSV alone frequently cover the 2.5 line before half-time'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'PSV Eindhoven to Score (Home Over 0.5)',
        shortLabel: 'PSV to Score',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: 'PSV have not failed to score at home since October 2023'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'PEC Zwolle to Score (Away Over 0.5)',
        shortLabel: 'PEC Zwolle to Score',
        odds: 1.80,
        impliedProb: 55.6,
        bankerRating: 62,
        reasoning: 'Low possession expected vs dominant PSV midfield'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'PSV Eindhoven or Draw (1X Double Chance)',
        shortLabel: 'PSV 1X',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: 'Ultimate safety pick for accumulator rollover'
      }
    }
  },

  // TEATIME SLOT (16:30 - 18:30) - Active Weekday & Key Weekend Window
  {
    id: 'fix-t1',
    paddyCode: 'PP-30901',
    league: 'Bundesliga (GER)',
    leagueCountry: 'Germany',
    homeTeam: 'Bayer Leverkusen',
    awayTeam: 'Heidenheim',
    kickoffTime: '17:30',
    kickoffSlot: 'teatime',
    isWeekendOnly: false,
    homeForm: ['W', 'D', 'W', 'W', 'W'],
    awayForm: ['L', 'L', 'D', 'L', 'W'],
    homeGoalsAvg: 2.7,
    awayGoalsAvg: 1.1,
    homeScoredLastMatches: 'Scored in 36 of last 37 competitive home fixtures',
    awayScoredLastMatches: 'Conceded in 11 consecutive away trips',
    h2hSummary: 'Leverkusen won 4-1 and 2-1 in their previous encounters',
    venue: 'BayArena, Leverkusen',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Bayer Leverkusen to Win (Straight Win)',
        shortLabel: 'Leverkusen Win',
        odds: 1.20,
        impliedProb: 83.3,
        bankerRating: 94,
        reasoning: 'Alonso’s tactics create persistent overload on Heidenheim’s low block'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: '100% of Leverkusen matches at BayArena this season had at least 1 goal'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.14,
        impliedProb: 87.7,
        bankerRating: 96,
        reasoning: 'Over 1.5 goals hit in 93% of Leverkusen home fixtures'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.40,
        impliedProb: 71.4,
        bankerRating: 87,
        reasoning: 'High-tempo transition match produces average 3.2 goals'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'Bayer Leverkusen to Score (Home Over 0.5)',
        shortLabel: 'Leverkusen to Score',
        odds: 1.04,
        impliedProb: 96.2,
        bankerRating: 99,
        reasoning: 'Leverkusen generate 2.1 xG per home fixture'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'Heidenheim to Score (Away Over 0.5)',
        shortLabel: 'Heidenheim to Score',
        odds: 1.65,
        impliedProb: 60.6,
        bankerRating: 70,
        reasoning: 'Heidenheim dangerous on set pieces'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'Leverkusen or Draw (1X Double Chance)',
        shortLabel: 'Leverkusen 1X',
        odds: 1.04,
        impliedProb: 96.2,
        bankerRating: 98,
        reasoning: 'Extraordinarily resilient record in late teatime fixtures'
      }
    }
  },
  {
    id: 'fix-t2',
    paddyCode: 'PP-30902',
    league: 'Premier League (ENG)',
    leagueCountry: 'England',
    homeTeam: 'Arsenal',
    awayTeam: 'Everton',
    kickoffTime: '17:30',
    kickoffSlot: 'teatime',
    isWeekendOnly: false,
    homeForm: ['W', 'W', 'W', 'D', 'W'],
    awayForm: ['D', 'L', 'L', 'D', 'L'],
    homeGoalsAvg: 2.5,
    awayGoalsAvg: 0.8,
    homeScoredLastMatches: 'Scored in 21 of last 22 matches at the Emirates Stadium',
    awayScoredLastMatches: 'Everton failed to score in 4 of last 6 away games',
    h2hSummary: 'Arsenal have won 8 of their last 9 home fixtures against Everton',
    venue: 'Emirates Stadium, London',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Arsenal to Win (Straight Win)',
        shortLabel: 'Arsenal Win',
        odds: 1.25,
        impliedProb: 80.0,
        bankerRating: 93,
        reasoning: 'Arsenal boast the league’s lowest xGA (0.71) and dominant set-piece mastery'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.03,
        impliedProb: 97.1,
        bankerRating: 99,
        reasoning: 'Near impossible for Arteta’s offense to fail generating goals at home'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.18,
        impliedProb: 84.7,
        bankerRating: 94,
        reasoning: 'Over 1.5 goals has landed in 18 of last 20 Arsenal home matches'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.55,
        impliedProb: 64.5,
        bankerRating: 82,
        reasoning: 'Dependent on Everton defensive stubbornness'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'Arsenal to Score (Home Over 0.5)',
        shortLabel: 'Arsenal to Score',
        odds: 1.05,
        impliedProb: 95.2,
        bankerRating: 98,
        reasoning: 'Saka, Havertz and Odegaard in peak chance-creation form'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'Everton to Score (Away Over 0.5)',
        shortLabel: 'Everton to Score',
        odds: 1.95,
        impliedProb: 51.3,
        bankerRating: 55,
        reasoning: 'Low likelihood against Gabriel and Saliba partnership'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'Arsenal or Draw (1X Double Chance)',
        shortLabel: 'Arsenal 1X',
        odds: 1.05,
        impliedProb: 95.2,
        bankerRating: 98,
        reasoning: 'Zero defeats for Arsenal at home this campaign'
      }
    }
  },
  {
    id: 'fix-t3',
    paddyCode: 'PP-30903',
    league: 'Primeira Liga (POR)',
    leagueCountry: 'Portugal',
    homeTeam: 'Sporting CP',
    awayTeam: 'Estoril Praia',
    kickoffTime: '18:00',
    kickoffSlot: 'teatime',
    isWeekendOnly: false,
    homeForm: ['W', 'W', 'W', 'W', 'W'],
    awayForm: ['L', 'D', 'L', 'L', 'D'],
    homeGoalsAvg: 3.2,
    awayGoalsAvg: 0.9,
    homeScoredLastMatches: 'Gyökeres and Sporting scored in 27 consecutive league games',
    awayScoredLastMatches: 'Estoril have conceded in 12 consecutive away trips',
    h2hSummary: 'Sporting have won 6 straight H2H by an aggregate of 19-3',
    venue: 'Estádio José Alvalade, Lisbon',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Sporting CP to Win (Straight Win)',
        shortLabel: 'Sporting Win',
        odds: 1.15,
        impliedProb: 87.0,
        bankerRating: 96,
        reasoning: 'Sporting have won 100% of home league matches with +28 goal difference'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.01,
        impliedProb: 99.0,
        bankerRating: 100,
        reasoning: '100% hit rate across all Sporting games for 2 consecutive seasons'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.10,
        impliedProb: 90.9,
        bankerRating: 97,
        reasoning: 'Sporting average 3.2 team goals per match alone'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.30,
        impliedProb: 76.9,
        bankerRating: 90,
        reasoning: 'Over 2.5 landed in 18 of Sporting’s 21 league matches'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'Sporting CP to Score (Home Over 0.5)',
        shortLabel: 'Sporting to Score',
        odds: 1.03,
        impliedProb: 97.1,
        bankerRating: 99,
        reasoning: 'Gyökeres is Europe’s most consistent striker converting at 0.98 goals/90'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'Estoril to Score (Away Over 0.5)',
        shortLabel: 'Estoril to Score',
        odds: 1.82,
        impliedProb: 54.9,
        bankerRating: 61,
        reasoning: 'Estoril will rely on counter opportunities'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'Sporting CP or Draw (1X Double Chance)',
        shortLabel: 'Sporting 1X',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: 'Ironclad safety pick for high-certainty accumulators'
      }
    }
  },

  // EVENING SLOT (19:00 - 21:00)
  {
    id: 'fix-e1',
    paddyCode: 'PP-40112',
    league: 'La Liga (ESP)',
    leagueCountry: 'Spain',
    homeTeam: 'Real Madrid',
    awayTeam: 'Las Palmas',
    kickoffTime: '20:00',
    kickoffSlot: 'evening',
    homeForm: ['W', 'W', 'W', 'D', 'W'],
    awayForm: ['L', 'L', 'D', 'L', 'L'],
    homeGoalsAvg: 2.6,
    awayGoalsAvg: 0.7,
    homeScoredLastMatches: 'Scored in 29 consecutive home matches at the Santiago Bernabéu',
    awayScoredLastMatches: 'Conceded in 13 of last 14 away games in La Liga',
    h2hSummary: 'Real Madrid have won 7 of last 8 meetings with an average of 2.9 goals',
    venue: 'Santiago Bernabéu, Madrid',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Real Madrid to Win (Straight Win)',
        shortLabel: 'Real Madrid Win',
        odds: 1.20,
        impliedProb: 83.3,
        bankerRating: 95,
        reasoning: 'Vinicius Jr, Mbappe and Bellingham playing in tandem under Bernabéu lights'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: 'Zero scoreless games at the Bernabéu over the last 52 competitive fixtures'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.13,
        impliedProb: 88.5,
        bankerRating: 96,
        reasoning: 'Over 1.5 goals landed in 24 of Real Madrid’s last 25 matches'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.38,
        impliedProb: 72.5,
        bankerRating: 88,
        reasoning: 'Real Madrid average 2.6 goals/match alone this season'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'Real Madrid to Score (Home Over 0.5)',
        shortLabel: 'Real Madrid to Score',
        odds: 1.04,
        impliedProb: 96.2,
        bankerRating: 99,
        reasoning: 'Real Madrid have scored in every home game of 2025/2026'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'Las Palmas to Score (Away Over 0.5)',
        shortLabel: 'Las Palmas to Score',
        odds: 1.88,
        impliedProb: 53.2,
        bankerRating: 58,
        reasoning: 'Las Palmas rarely threaten against Madrid deep block'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'Real Madrid or Draw (1X Double Chance)',
        shortLabel: 'Real Madrid 1X',
        odds: 1.04,
        impliedProb: 96.2,
        bankerRating: 98,
        reasoning: 'Bernabéu fortress provides rock-solid security'
      }
    }
  },
  {
    id: 'fix-e2',
    paddyCode: 'PP-40113',
    league: 'Serie A (ITA)',
    leagueCountry: 'Italy',
    homeTeam: 'Inter Milan',
    awayTeam: 'Monza',
    kickoffTime: '19:45',
    kickoffSlot: 'evening',
    homeForm: ['W', 'W', 'W', 'W', 'D'],
    awayForm: ['L', 'D', 'L', 'L', 'L'],
    homeGoalsAvg: 2.4,
    awayGoalsAvg: 0.6,
    homeScoredLastMatches: 'Lautaro Martinez and Thuram have scored in 9 of last 10 San Siro games',
    awayScoredLastMatches: 'Monza have conceded first in 8 of their last 9 matches',
    h2hSummary: 'Inter won 5-1 and 2-0 in recent head to heads',
    venue: 'San Siro, Milan',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Inter Milan to Win (Straight Win)',
        shortLabel: 'Inter Win',
        odds: 1.25,
        impliedProb: 80.0,
        bankerRating: 94,
        reasoning: 'Inzaghi’s side has conceded just 9 goals in 17 home matches'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: '100% of Inter matches this term had 1+ goals'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.15,
        impliedProb: 87.0,
        bankerRating: 95,
        reasoning: 'Over 1.5 goals in 88% of San Siro evening encounters'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.45,
        impliedProb: 69.0,
        bankerRating: 85,
        reasoning: 'Good goal potential given Monza open structure'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'Inter Milan to Score (Home Over 0.5)',
        shortLabel: 'Inter to Score',
        odds: 1.05,
        impliedProb: 95.2,
        bankerRating: 98,
        reasoning: 'Inter score in 96% of home games across 3 years'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'Monza to Score (Away Over 0.5)',
        shortLabel: 'Monza to Score',
        odds: 1.95,
        impliedProb: 51.3,
        bankerRating: 54,
        reasoning: 'Monza struggles on the road vs top 4 defenses'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'Inter Milan or Draw (1X Double Chance)',
        shortLabel: 'Inter 1X',
        odds: 1.05,
        impliedProb: 95.2,
        bankerRating: 98,
        reasoning: 'Rock solid Italian champion defense'
      }
    }
  },
  {
    id: 'fix-e3',
    paddyCode: 'PP-40114',
    league: 'Ligue 1 (FRA)',
    leagueCountry: 'France',
    homeTeam: 'Paris Saint-Germain',
    awayTeam: 'Angers',
    kickoffTime: '20:00',
    kickoffSlot: 'evening',
    homeForm: ['W', 'W', 'W', 'W', 'W'],
    awayForm: ['L', 'L', 'D', 'L', 'L'],
    homeGoalsAvg: 2.9,
    awayGoalsAvg: 0.8,
    homeScoredLastMatches: 'Barcola and Dembele leading offensive surge with 23 goals in last 7 matches',
    awayScoredLastMatches: 'Angers conceded 2+ in 6 consecutive away league fixtures',
    h2hSummary: 'PSG have won 16 consecutive matches against Angers since 2015',
    venue: 'Parc des Princes, Paris',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Paris Saint-Germain to Win (Straight Win)',
        shortLabel: 'PSG Win',
        odds: 1.15,
        impliedProb: 87.0,
        bankerRating: 96,
        reasoning: 'PSG have a 16-game consecutive winning streak against Angers'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: 'Zero 0-0 results for PSG in their last 80 domestic fixtures'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.10,
        impliedProb: 90.9,
        bankerRating: 97,
        reasoning: 'Over 1.5 goals in 94% of matches at the Parc des Princes'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.32,
        impliedProb: 75.8,
        bankerRating: 89,
        reasoning: 'PSG home fixtures produce 3.7 total match goals'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'PSG to Score (Home Over 0.5)',
        shortLabel: 'PSG to Score',
        odds: 1.03,
        impliedProb: 97.1,
        bankerRating: 99,
        reasoning: 'PSG have scored in 31 straight home games'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'Angers to Score (Away Over 0.5)',
        shortLabel: 'Angers to Score',
        odds: 1.90,
        impliedProb: 52.6,
        bankerRating: 56,
        reasoning: 'Low conversion rate on fast breaks'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'PSG or Draw (1X Double Chance)',
        shortLabel: 'PSG 1X',
        odds: 1.03,
        impliedProb: 97.1,
        bankerRating: 99,
        reasoning: 'Paddy Power banker grade 1X security'
      }
    }
  },

  // LATE NIGHT / AMERICAS / GLOBAL SLOT (21:30 - 23:45) - Active on busy days & weekends
  {
    id: 'fix-ln1',
    paddyCode: 'PP-50201',
    league: 'Brasileirão (BRA)',
    leagueCountry: 'Brazil',
    homeTeam: 'Flamengo',
    awayTeam: 'Criciúma',
    kickoffTime: '22:00',
    kickoffSlot: 'latenight',
    isWeekendOnly: false,
    homeForm: ['W', 'W', 'D', 'W', 'W'],
    awayForm: ['L', 'D', 'L', 'L', 'D'],
    homeGoalsAvg: 2.2,
    awayGoalsAvg: 0.7,
    homeScoredLastMatches: 'Scored in 15 of last 16 matches at the Maracanã',
    awayScoredLastMatches: 'Conceded in 10 consecutive away games',
    h2hSummary: 'Flamengo have won 5 of last 6 H2H at the Maracanã',
    venue: 'Maracanã Stadium, Rio de Janeiro',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Flamengo to Win (Straight Win)',
        shortLabel: 'Flamengo Win',
        odds: 1.28,
        impliedProb: 78.1,
        bankerRating: 92,
        reasoning: 'Maracanã atmosphere and Pedro/De Arrascaeta quality mismatch'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.03,
        impliedProb: 97.1,
        bankerRating: 99,
        reasoning: '98% of Flamengo home games feature at least 1 goal'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.20,
        impliedProb: 83.3,
        bankerRating: 93,
        reasoning: 'Over 1.5 goals in 85% of matches in Rio'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.62,
        impliedProb: 61.7,
        bankerRating: 80,
        reasoning: 'Brazilian league can tighten up second half'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'Flamengo to Score (Home Over 0.5)',
        shortLabel: 'Flamengo to Score',
        odds: 1.06,
        impliedProb: 94.3,
        bankerRating: 98,
        reasoning: 'Flamengo scored in 22 of last 23 matches in all competitions'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'Criciúma to Score (Away Over 0.5)',
        shortLabel: 'Criciúma to Score',
        odds: 1.88,
        impliedProb: 53.2,
        bankerRating: 57,
        reasoning: 'Tough night expected in Rio'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'Flamengo or Draw (1X Double Chance)',
        shortLabel: 'Flamengo 1X',
        odds: 1.06,
        impliedProb: 94.3,
        bankerRating: 97,
        reasoning: 'Unbeaten at the Maracanã in 14 games'
      }
    }
  },
  {
    id: 'fix-ln2',
    paddyCode: 'PP-50202',
    league: 'MLS (USA)',
    leagueCountry: 'USA',
    homeTeam: 'Inter Miami',
    awayTeam: 'Toronto FC',
    kickoffTime: '23:30',
    kickoffSlot: 'latenight',
    isWeekendOnly: false,
    homeForm: ['W', 'W', 'W', 'W', 'D'],
    awayForm: ['L', 'L', 'D', 'L', 'L'],
    homeGoalsAvg: 2.8,
    awayGoalsAvg: 1.1,
    homeScoredLastMatches: 'Messi, Suarez and Miami have scored in 26 consecutive MLS games',
    awayScoredLastMatches: 'Toronto conceded in 14 straight road matches',
    h2hSummary: 'Inter Miami won 3-1 and 4-0 in last two home clashes with Toronto',
    venue: 'Chase Stadium, Fort Lauderdale',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Inter Miami to Win (Straight Win)',
        shortLabel: 'Inter Miami Win',
        odds: 1.30,
        impliedProb: 76.9,
        bankerRating: 91,
        reasoning: 'Messi and Suarez combination creates 3.2 big chances per 90'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: 'Never had a 0-0 in Inter Miami home history with Messi'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.11,
        impliedProb: 90.1,
        bankerRating: 97,
        reasoning: 'MLS features highest average goals in North America (3.4 g/m)'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.35,
        impliedProb: 74.1,
        bankerRating: 90,
        reasoning: 'Miami games have seen over 2.5 in 19 of their last 21 outings'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'Inter Miami to Score (Home Over 0.5)',
        shortLabel: 'Miami to Score',
        odds: 1.04,
        impliedProb: 96.2,
        bankerRating: 99,
        reasoning: 'Miami scored 2+ goals in 8 of last 9 home encounters'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'Toronto FC to Score (Away Over 0.5)',
        shortLabel: 'Toronto to Score',
        odds: 1.45,
        impliedProb: 69.0,
        bankerRating: 78,
        reasoning: 'Miami defense concedes occasional transition goal'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'Inter Miami or Draw (1X Double Chance)',
        shortLabel: 'Miami 1X',
        odds: 1.06,
        impliedProb: 94.3,
        bankerRating: 97,
        reasoning: 'Unbeaten at Chase Stadium in MLS regular season play'
      }
    }
  },
  {
    id: 'fix-ln3',
    paddyCode: 'PP-50203',
    league: 'La Liga (ESP)',
    leagueCountry: 'Spain',
    homeTeam: 'Barcelona',
    awayTeam: 'Getafe',
    kickoffTime: '21:00',
    kickoffSlot: 'evening',
    isWeekendOnly: false,
    homeForm: ['W', 'W', 'W', 'W', 'W'],
    awayForm: ['D', 'L', 'L', 'D', 'L'],
    homeGoalsAvg: 3.0,
    awayGoalsAvg: 0.6,
    homeScoredLastMatches: 'Flick’s Barca scored in 25 straight competitive matches',
    awayScoredLastMatches: 'Getafe have 1 goal in last 4 away trips',
    h2hSummary: 'Barcelona have won 8 of last 9 home matches vs Getafe',
    venue: 'Estadi Olímpic Lluís Companys, Barcelona',
    markets: {
      STRAIGHT_WIN: {
        type: 'STRAIGHT_WIN',
        label: 'Barcelona to Win (Straight Win)',
        shortLabel: 'Barcelona Win',
        odds: 1.22,
        impliedProb: 82.0,
        bankerRating: 95,
        reasoning: 'Hansi Flick high press causes an average of 4.8 turnovers in attacking third'
      },
      OVER_0_5: {
        type: 'OVER_0_5',
        label: 'Over 0.5 Total Match Goals',
        shortLabel: 'Over 0.5 Goals',
        odds: 1.02,
        impliedProb: 98.0,
        bankerRating: 99,
        reasoning: '100% of Barca fixtures this season feature at least 1 goal'
      },
      OVER_1_5: {
        type: 'OVER_1_5',
        label: 'Over 1.5 Total Match Goals',
        shortLabel: 'Over 1.5 Goals',
        odds: 1.15,
        impliedProb: 87.0,
        bankerRating: 96,
        reasoning: 'Barcelona home games average 3.6 goals'
      },
      OVER_2_5: {
        type: 'OVER_2_5',
        label: 'Over 2.5 Total Match Goals',
        shortLabel: 'Over 2.5 Goals',
        odds: 1.45,
        impliedProb: 69.0,
        bankerRating: 86,
        reasoning: 'Yamal, Raphinha and Lewandowski on fire'
      },
      HOME_TO_SCORE: {
        type: 'HOME_TO_SCORE',
        label: 'Barcelona to Score (Home Over 0.5)',
        shortLabel: 'Barcelona to Score',
        odds: 1.04,
        impliedProb: 96.2,
        bankerRating: 99,
        reasoning: 'Barca scored in 100% of home fixtures in 2025/2026'
      },
      AWAY_TO_SCORE: {
        type: 'AWAY_TO_SCORE',
        label: 'Getafe to Score (Away Over 0.5)',
        shortLabel: 'Getafe to Score',
        odds: 1.95,
        impliedProb: 51.3,
        bankerRating: 54,
        reasoning: 'Getafe low block concentrates on defensive preservation'
      },
      DOUBLE_CHANCE: {
        type: 'DOUBLE_CHANCE',
        label: 'Barcelona or Draw (1X Double Chance)',
        shortLabel: 'Barcelona 1X',
        odds: 1.04,
        impliedProb: 96.2,
        bankerRating: 98,
        reasoning: 'Flawless home record in league campaign'
      }
    }
  }
];
