export interface Video {
  anchor?: string;
  video_file: { url: string };
  subtitles: {
    start_time: string;
    end_time: string;
    content: string;
  }[];
}
