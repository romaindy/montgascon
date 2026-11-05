export interface Access {
  anchor?: string;
  section_title: string;
  map: Image;
  title: string;
  content: string;
  buttons: {
    url: string;
    image: Image;
    new_tab: boolean;
  }[];
}
