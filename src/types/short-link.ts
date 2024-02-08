export interface ShortLinkInfo {
  id: number;
  short: string;
  target: string;
  counter: number;
}

export type DataLinksInfo = {
  list: ShortLinkInfo[];
  totalCount: string | null;
};
