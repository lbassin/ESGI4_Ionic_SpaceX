export interface ICapsule {
  id: string;
  name: string;
  type: string;
  active: boolean;
  crew_capacity: number;
  sidewall_angle_deg: number;
  orbit_duration_yr: number;
  heat_shield: IHeatshield;
  thrusters: IThruster[];
  launch_payload_mass: ILaunchpayloadmass;
  launch_payload_vol: ILaunchpayloadvol;
  return_payload_mass: ILaunchpayloadmass;
  return_payload_vol: ILaunchpayloadvol;
  pressurized_capsule: IPressurizedcapsule;
  trunk: ITrunk;
  height_w_trunk: IHeightwtrunk;
  diameter: IHeightwtrunk;
}

export interface IHeightwtrunk {
  meters: number;
  feet: number;
}

export interface ITrunk {
  trunk_volume: ILaunchpayloadvol;
  cargo: ICargo;
}

export interface ICargo {
  solar_array: number;
  unpressurized_cargo: boolean;
}

export interface IPressurizedcapsule {
  payload_volume: ILaunchpayloadvol;
}

export interface ILaunchpayloadvol {
  cubic_meters: number;
  cubic_feet: number;
}

export interface ILaunchpayloadmass {
  kg: number;
  lb: number;
}

export interface IThruster {
  type: string;
  amount: number;
  pods: number;
  fuel_1: string;
  fuel_2: string;
  thrust: IThrust;
}

export interface IThrust {
  kN: number;
  lbf: number;
}

export interface IHeatshield {
  material: string;
  size_meters: number;
  temp_degrees: number;
  dev_partner: string;
}
