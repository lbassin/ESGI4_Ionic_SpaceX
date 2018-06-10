export interface IRocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
  first_stage: IFirstStage;
  second_stage: ISecondStage;
}

export interface IFirstStage {
  cores: ICore[];
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
