import { TrackModel } from "./Track";

export interface AlbumModel {
  id: string;
  title: string;
  artist: string;
  cover: string;
  releaseDate: string;
  tracks: TrackModel[];
}