import { TrackModel } from "./Track";

export interface PlaylistModel {
  id: string;
  title: string;
  tracks: TrackModel[];
  coverUrl: string;
  user: string;
  dateOfUpdate: number;
  dateOfCreation: number;
}