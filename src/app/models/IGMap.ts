export interface IGMap {
  results: IResult[];
  status: string;
}

export interface IResult {
  address_components: IAddresscomponent[];
  formatted_address: string;
  geometry: IGeometry;
  place_id: string;
  types: string[];
}

export interface IGeometry {
  bounds: IBounds;
  location: INortheast;
  location_type: string;
  viewport: IBounds;
}

export interface IBounds {
  northeast: INortheast;
  southwest: INortheast;
}

export interface INortheast {
  lat: number;
  lng: number;
}

export interface IAddresscomponent {
  long_name: string;
  short_name: string;
  types: string[];
}
