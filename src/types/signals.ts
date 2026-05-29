export type SignalDirection = "LONG" | "SHORT";
export type SignalMarket = "forex" | "crypto" | "stocks";
export type SignalRisk = "Low" | "Medium" | "High";
export type SignalStatus = "active" | "closed" | "pending";

export type Signal = {
  id: string;
  providerId: string;
  providerName: string;
  providerVerified: boolean;
  pair: string;
  market: SignalMarket;
  direction: SignalDirection;
  entry: string;
  tp1: string;
  tp2?: string;
  sl: string;
  timeframe: string;
  risk: SignalRisk;
  analysis: string;
  price: number;
  buyersCount: number;
  winRate: number;
  status: SignalStatus;
  createdAt: string;
};