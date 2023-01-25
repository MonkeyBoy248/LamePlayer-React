import { TrackModel } from "./Track";

export interface PlaylistModel {
  id: string;
  name: string;
  tracks: TrackModel[];
  coverUrl?: string;
  user: string;
  dateOfUpdate: number;
  dateOfCreation: number;
}