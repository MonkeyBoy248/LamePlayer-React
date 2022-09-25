import { TrackModel } from "./Track";

export interface PlaylistModel {
  id: number;
  name: string;
  tracks: TrackModel[];
  cover_url: string;
  user: string;
  date_of_update: string;
  date_of_creation: string;
}