import { TrackModel } from './Track';

export interface ArtistModel {
  id: string;
  name: string;
  tracks: TrackModel[];
  imageUrl: string;
  genres: string[];
}
