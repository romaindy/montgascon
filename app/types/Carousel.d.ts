export interface Carousel {
  anchor?: string;
  section_title: string;
  title: string;
  description: string;
  items: {
    image: Image;
    title: string;
    content: string;
  }[];
  cta: {
    link: {
      title: string;
      url: string;
      target: string;
    };
    icon: string;
  };
}
