export interface MultiGalleries {
  anchor?: string;
  title: string;
  galleries: {
    menu_title: string;
    images: Image[];
  }[];
}
