export interface Information {
  anchor?: string;
  title: string;
  list: {
    item: string;
  }[];
  cta: CTA;
  information: {
    item: string;
  }[];
}
