export type RequestQuery = {
  search?: string;
  sortby?: string;
  filter?: string;
  offset?: number;
  limit?: number;
};

export type LinkField = 'title' | 'destination' | 'createdAt';

export type GenLinkProps = {
  baseUrl: string;
  search?: string;
  sortby?: string;
  offset: number;
  limit: number;
};
