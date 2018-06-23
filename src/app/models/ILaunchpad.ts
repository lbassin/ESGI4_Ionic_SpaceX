export interface ILaunchpad {
  id: string;
  full_name: string;
  status: string;
  location: ILocation;
  vehicles_launched: string[];
  details: string;
}

export interface ILocation {
  name: string;
  region: string;
  latitude: number;
  longitude: number;
}
