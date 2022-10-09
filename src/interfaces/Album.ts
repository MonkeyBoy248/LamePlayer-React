import { TrackModel } from "./Track";

export interface AlbumModel {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  tracks: TrackModel[];
}