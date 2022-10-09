export interface TrackModel {
  id: string;
  name: string;
  artist: string;
  album?: string;
  src: string;
  coverUrl?: string;
}