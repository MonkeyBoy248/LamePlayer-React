import { TrackModel } from "./Track";

export interface PlaylistModel {
  id: string;
  title: string;
  tracks: TrackModel[];
  coverUrl: string;
  user: string;
  createdByUser: boolean;
  dateOfUpdate: number;
  dateOfCreation: number;
}

export interface Playlists {
  [key: string]: PlaylistModel;
}