interface IGMap {
  results: IResult[];
  status: string;
}

interface IResult {
  address_components: IAddresscomponent[];
  formatted_address: string;
  geometry: IGeometry;
  place_id: string;
  types: string[];
}

interface IGeometry {
  bounds: IBounds;
  location: INortheast;
  location_type: string;
  viewport: IBounds;
}

interface IBounds {
  northeast: INortheast;
  southwest: INortheast;
}

interface INortheast {
  lat: number;
  lng: number;
}

interface IAddresscomponent {
  long_name: string;
  short_name: string;
  types: string[];
}
