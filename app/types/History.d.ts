export interface History {
  acf_fc_layout: "history";
  anchor: string;
  section_title: string;
  section_one: HistoryContent;
  section_two: HistorySection;
  section_three: HistorySection;
  section_four: HistorySection;
}

interface HistoryContent {
  title: string;
  content: string;
}

interface HistorySection extends HistoryContent {
  image_one: Image;
  image_two: Image;
}
