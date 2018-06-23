export interface ISearchResult {
  groups: ISearchResultGroup[];
}

export interface ISearchResultGroup {
  label: string,
  data: ISearchResultEntry[],
}

export interface ISearchResultEntry {
  title: string,
  image: string,
  description: string,
  route: string,
}
