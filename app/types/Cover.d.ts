export interface Cover {
  anchor?: string;
  image: Image;
  link: {
    title: string;
    url: string;
    target: string;
  };
  cursor: Image;
}
