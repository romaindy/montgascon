export interface Team {
  anchor?: string;
  section_title: string;
  title: string;
  content: string;
  image: Image;
  team: {
    name: string;
    content: string;
    picture: Image;
  }[];
}
