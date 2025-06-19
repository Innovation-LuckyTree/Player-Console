export interface BetHistoryList {
  key: React.Key;
  id: number;
  date: Date;
  game: string;
  provider: string;
  betAmount: number;
  winAmount: number;
  netPL: number;
  status: number;
  details: number;
}