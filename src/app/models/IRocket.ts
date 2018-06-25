export interface IRocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  height: IHeight;
  diameter: IHeight;
  mass: IMass;
  payload_weights: IPayloadWeight[];
  first_stage: IFirstStage;
  second_stage: ISecondStage;
  engines: IEngines;
  landing_legs: ILandingLegs;
  description: string;
}

export interface IFirstStage {
  cores: ICore[];
  thrust_vacuum: IThrust;
  thrust_sea_level: IThrust;
  burn_time_sec: string;
  fuel_amount_tons: string;
}

export interface ICore {
  core_serial: string;
  flight?: number;
  block?: number;
  reused?: boolean;
  land_success?: boolean;
  landing_type: string;
  landing_vehicle: string;
}

export interface ISecondStage {
  payloads: IPayload[];
  fuel_amount_tons: string;
  burn_time_sec: string;
  thrust: IThrust;
}

export interface IPayload {
  payload_id: string;
  reused?: boolean;
  customers: string[];
  payload_type: string;
  payload_mass_kg?: number;
  payload_mass_lbs?: number;
  orbit: string;
  cap_serial: string;
  mass_returned_kg?: number;
  mass_returned_lbs?: number;
  flight_time_sec?: number;
  cargo_manifest: string;
}

export interface IMass {
  kg: number;
  lb: number;
}

export interface IHeight {
  meters: number;
  feet: number;
}

export interface IPayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}

export interface IEngines {
  number: number;
  type: string;
  version: string;
  layout?: string;
  engine_loss_max?: number;
  propellant_1: string;
  propellant_2: string;
  thrust_sea_level: IThrust;
  thrust_vacuum: IThrust;
  thrust_to_weight?: number;
}

export interface IThrust {
  kN: number;
  lbf: number;
}

export interface ILandingLegs {
  number: number;
  material?: string;
}
