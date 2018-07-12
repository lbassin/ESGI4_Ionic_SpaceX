export interface ICompanyInfos {
  name: string;
  founder: string;
  founded: number;
  employees: number;
  vehicles: number;
  launch_sites: number;
  test_sites: number;
  ceo: string;
  cto: string;
  coo: string;
  cto_propulsion: string;
  valuation: number;
  headquarters: ICompanyHeadquarters;
  summary: string;
}

export interface ICompanyHeadquarters {
  address: string;
  city: string;
  state: string;
}

export interface ICompanyHistory {
  title: string;
  event_date_utc: string;
  event_date_unix: number;
  flight_number?: number;
  details: string;
  links: ICompanyHistoryLinks;
}

export interface ICompanyHistoryLinks {
  reddit?: string;
  article: string;
  wikipedia?: string;
}
