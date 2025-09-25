export type StageStatus = "completed" | "current" | "pending";
export type TrackingStatus = "Livré" | "En transit" | "Douane" | "Préparation" | string;
export type TransportMode = "aerial" | "maritime";

export interface Stage {
  stage: string;
  description: string;
  location: string;
  status: StageStatus;
  date?: string;
}

export interface Tracking {
  id: string;
  client: string;
  origin: string;
  destination: string;
  currentLocation: string;
  estimatedDelivery: string;
  status: TrackingStatus;
  transportMode: TransportMode;
  stages: Stage[];
}
