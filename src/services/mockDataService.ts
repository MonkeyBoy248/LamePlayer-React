import { TrackModel } from "../interfaces/Track";
import { v4 as uuidv4, v4 } from "uuid";
import { PlaylistModel } from "../interfaces/Playlist";
import { AlbumModel } from "../interfaces/Album";

const mockTracks: Omit<TrackModel, 'id'>[] = [
  {
      name: 'Judith',
      artist: 'A Perfect Circle',
      album: 'Mer de Noms',
      cover: 'mer-de-noms.jpg',
      src: 'A Perfect Circle - Judith.mp3'
  },
  {
      name: 'The Outsider',
      artist: 'A Perfect Circle',
      album: 'Thirteenth Step',
      cover: 'thirteenth-step.jpg',
      src: 'A Perfect Circle - The Outsider.mp3'
  },
  {
      name: 'Parasite Eve',
      artist: 'Bring Me The Horizon',
      album: 'Post Human: Survival Horror',
      cover: 'post-human-survival-horror.jpg',
      src: 'Bring Me The Horizon - Parasite Eve.mp3'
  },
  {
      name: 'Teardrops',
      artist: 'Bring Me The Horizon',
      album: 'Post Human: Survival Horror',
      cover: 'post-human-survival-horror.jpg',
      src: 'Bring Me The Horizon - Teardrops.mp3'
  },
  {
      name: 'Anna Molly',
      artist: 'Incubus',
      album: 'Light Grenades',
      cover: 'light-grenades.jpg',
      src: 'Incubus - Anna Molly.mp3'
  },
  {
      name: 'Drive',
      artist: 'Incubus',
      album: 'Make Yourself',
      cover: 'make-yourself.jpg',
      src: 'Incubus - Drive.mp3'
  },
  {
      name: 'Love Hurts',
      artist: 'Incubus',
      album: 'Light Grenades',
      cover: 'light-grenades.jpg',
      src: 'Incubus - Love Hurts.mp3'
  },
  {
      name: 'This Love',
      artist: 'Maroon 5',
      album: 'Songs About Jane',
      cover: 'songs-about-jane.jpg',
      src: 'Maroon 5 - This Love.mp3'
  },
  {
      name: 'Wake Up Call',
      artist: 'Maroon 5',
      album: "It Won`t Be Soon Before Long",
      cover: 'wake-up-call.jpg',
      src: 'Maroon 5 - Wake Up Call.mp3'
  },
  {
      name: 'Carnival Of Rust',
      artist: 'Poets Of The Fall',
      album: 'Carnival Of Rust',
      cover: 'carnival-of-rust.jpg',
      src: 'Poets Of The Fall - Carnival Of Rust.mp3'
  },
  {
      name: 'Given And Denied',
      artist: 'Poets Of The Fall',
      album: 'Twilight Theater',
      cover: 'twilight-theater.jpg',
      src: 'Poets Of The Fall - Given And Denied.mp3'
  },
  {
      name: 'King Of Fools',
      artist: 'Poets Of The Fall',
      album: 'Carnival Of Rust',
      cover: 'carnival-of-rust.jpg',
      src: 'Poets Of The Fall - King Of Fools.mp3'
  },
  {
      name: "Fur Cue",
      artist: 'Seether',
      album: 'Holding Onto Strings Better Left To Fray',
      cover: 'holding-onto-strings-better-left-to-fray.jpg',
      src: 'Seether - Fur Cue.mp3'
  },
  {
      name: 'Simplest Mistake',
      artist: 'Seether',
      album: 'Karma And Effect',
      cover: 'karma-and-effect.jpg',
      src: 'Seether - Simplest Mistake.mp3'
  },
  {
      name: "The Guardian (Ellie's Song)",
      artist: 'Shawn James',
      album: 'The Guardian',
      cover: 'the-guardian.jpg',
      src: "Shawn James - The Guardian (Ellie's Song).mp3"
  },
  {
      name: 'All The Same',
      artist: 'Sick Puppies',
      album: 'Dressed Up As Life',
      cover: 'dressed-up-as-life.jpg',
      src: 'Sick Puppies - All The Same.mp3'
  },
  {
      name: "You're Going Down",
      artist: 'Sick Puppies',
      album: 'Tri-Polar',
      cover: 'tri-polar.jpg',
      src: "Sick Puppies - You're Going Down.mp3"
  },
  {
      name: 'Vicarious',
      artist: 'Tool',
      album: '10, 000 Days',
      cover: '10, 000-days.jpg',
      src: 'Tool - Vicarious.mp3'
  },
  {
      name: 'Schism',
      artist: 'Tool',
      album: 'Lateralus',
      cover: 'lateralus.jpg',
      src: 'Tool - Schism.mp3'
  },
  {
      name: 'Parabola',
      artist: 'Tool',
      album: 'Lateralus',
      cover: 'lateralus.jpg',
      src: 'Tool - Parabola.mp3'
  },
  {
      name: 'The Pot',
      artist: 'Tool',
      album: '10, 000 Days',
      cover: '10, 000-days.jpg',
      src: 'Tool - The Pot.mp3'
  },
];

export const tracks = mockTracks.map((track) => {
    return {...track, id: uuidv4()};
})

export const playlists: PlaylistModel[] = [
    {
        id: 55,
        name: 'Favorites',
        date_of_creation: `${new Date().getUTCDate()}`,
        date_of_update: `${new Date().getUTCDate()}`,
        tracks: [tracks[4], tracks[15], tracks[19]],
        cover_url: tracks[17].cover!,
        user: 'MonkeyBoy'
    },
];

const mockAlbums: Omit<AlbumModel, 'id' | 'tracks'>[] = [
    {
        title: 'Mer de Noms',
        artist: 'A Perfect Circle',
        cover: 'mer-de-noms.jpg',
        releaseDate: '2000',
    },
    {
        artist: 'A Perfect Circle',
        title: 'Thirteenth Step',
        cover: 'thirteenth-step.jpg',
        releaseDate: '2003'
    },
    {
        artist: 'Bring Me The Horizon',
        title: 'Post Human: Survival Horror',
        cover: 'post-human-survival-horror.jpg',
        releaseDate: '2020'
    },
    {
        artist: 'Incubus',
        title: 'Light Grenades',
        cover: 'light-grenades.jpg',
        releaseDate: '2006',
    },
    {
        artist: 'Incubus',
        title: 'Make Yourself',
        cover: 'make-yourself.jpg',
        releaseDate: '1999'
    },
    {
        artist: 'Maroon 5',
        title: 'Songs About Jane',
        cover: 'songs-about-jane.jpg',
        releaseDate: '2002'
    },
    {
        artist: 'Maroon 5',
        title: "It Won`t Be Soon Before Long",
        cover: 'wake-up-call.jpg',
        releaseDate: '2007'
    },
    {
        artist: 'Poets Of The Fall',
        title: 'Carnival Of Rust',
        cover: 'carnival-of-rust.jpg',
        releaseDate: '2006'
    },
    {
        artist: 'Poets Of The Fall',
        title: 'Twilight Theater',
        cover: 'twilight-theater.jpg',
        releaseDate: '2010'
    },
    {
        artist: 'Seether',
        title: 'Holding Onto Strings Better Left To Fray',
        cover: 'holding-onto-strings-better-left-to-fray.jpg',
        releaseDate: '2011'
    },
    {
        artist: 'Seether',
        title: 'Karma And Effect',
        cover: 'karma-and-effect.jpg',
        releaseDate: '2005'
    },
    {
        artist: 'Shawn James',
        title: 'The Guardian',
        cover: 'the-guardian.jpg',
        releaseDate: '2020'
    },
    {
        artist: 'Sick Puppies',
        title: 'Dressed Up As Life',
        cover: 'dressed-up-as-life.jpg',
        releaseDate: '2007'
    },
    {
        artist: 'Sick Puppies',
        title: 'Tri-Polar',
        cover: 'tri-polar.jpg',
        releaseDate: '2009'
    },
    {
        artist: 'Tool',
        title: '10, 000 Days',
        cover: '10, 000-days.jpg',
        releaseDate: '2006'
    },
    {
        artist: 'Tool',
        title: 'Lateralus',
        cover: 'lateralus.jpg',
        releaseDate: '2001'
    }
]

function getAlbumTracks (albumTitle: string) {
    return tracks.filter((track) => track.album === albumTitle);
}

export const albums: AlbumModel[] = mockAlbums.map((album) => {
    return {
        ...album,
        id: v4(),
        tracks: getAlbumTracks(album.title),
    }
})

