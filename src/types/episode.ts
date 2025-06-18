export interface Episode {
  id: number;
  series: number;
  image_src: string;
  name: string;
  category: string;
  subcategory: string;
  user: number;
}

export interface EpisodeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Episode[];
}
