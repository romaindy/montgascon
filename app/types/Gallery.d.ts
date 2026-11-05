export interface Gallery {
  anchor?: string;
  layout:
    | "4-square"
    | "1x1 - 1x1 | 1x2 | 1x2"
    | "1x2 | 1x1 - 1x1 | 1x2"
    | "1x2 | 1x2 | 1x1 - 1x1"
    | "1x2 | 1x2 | 1x2"
    | "1x1 - 1x1 - 2x1 | 1x2"
    | "1x1 - 1x1 - 1x1 - 1x1 | 2x2"
    | "2x2 | 2x1 - 1x1 - 1x1"
    | "2x2 | 1x1 - 1x1 - 1x1 - 1x1";
  images: { image: Image }[];
}
