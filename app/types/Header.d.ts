export interface Header {
  logo: Image;
  menu_items: {
    link: Link;
    image: Image;
  }[];
  cta: {
    link: Link;
    icon: string;
  };
}
