import { TrackModel } from "@interfaces/Track";
import { PlaylistModel } from "@interfaces/Playlist";
import { AlbumModel } from "@interfaces/Album";
import { ArtistModel } from "@interfaces/Artist";

const mockTracks: Omit<TrackModel, 'id'>[] = [
  {
      title: 'Judith',
      artist: 'A Perfect Circle',
      album: 'Mer de Noms',
      coverUrl: 'mer-de-noms.jpg',
      src: 'A Perfect Circle - Judith.mp3'
  },
  {
      title: 'The Outsider',
      artist: 'A Perfect Circle',
      album: 'Thirteenth Step',
      coverUrl: 'thirteenth-step.jpg',
      src: 'A Perfect Circle - The Outsider.mp3'
  },
  {
      title: 'Parasite Eve',
      artist: 'Bring Me The Horizon',
      album: 'Post Human: Survival Horror',
      coverUrl: 'post-human-survival-horror.jpg',
      src: 'Bring Me The Horizon - Parasite Eve.mp3'
  },
  {
      title: 'Teardrops',
      artist: 'Bring Me The Horizon',
      album: 'Post Human: Survival Horror',
      coverUrl: 'post-human-survival-horror.jpg',
      src: 'Bring Me The Horizon - Teardrops.mp3'
  },
  {
      title: 'Anna Molly',
      artist: 'Incubus',
      album: 'Light Grenades',
      coverUrl: 'light-grenades.jpg',
      src: 'Incubus - Anna Molly.mp3'
  },
  {
      title: 'Drive',
      artist: 'Incubus',
      album: 'Make Yourself',
      coverUrl: 'make-yourself.jpg',
      src: 'Incubus - Drive.mp3'
  },
  {
      title: 'Love Hurts',
      artist: 'Incubus',
      album: 'Light Grenades',
      coverUrl: 'light-grenades.jpg',
      src: 'Incubus - Love Hurts.mp3'
  },
  {
      title: 'This Love',
      artist: 'Maroon 5',
      album: 'Songs About Jane',
      coverUrl: 'songs-about-jane.jpg',
      src: 'Maroon 5 - This Love.mp3'
  },
  {
      title: 'Wake Up Call',
      artist: 'Maroon 5',
      album: "It Won`t Be Soon Before Long",
      coverUrl: 'wake-up-call.jpg',
      src: 'Maroon 5 - Wake Up Call.mp3'
  },
  {
      title: 'Carnival Of Rust',
      artist: 'Poets Of The Fall',
      album: 'Carnival Of Rust',
      coverUrl: 'carnival-of-rust.jpg',
      src: 'Poets Of The Fall - Carnival Of Rust.mp3'
  },
  {
      title: 'Given And Denied',
      artist: 'Poets Of The Fall',
      album: 'Twilight Theater',
      coverUrl: 'twilight-theater.jpg',
      src: 'Poets Of The Fall - Given And Denied.mp3'
  },
  {
      title: 'King Of Fools',
      artist: 'Poets Of The Fall',
      album: 'Carnival Of Rust',
      coverUrl: 'carnival-of-rust.jpg',
      src: 'Poets Of The Fall - King Of Fools.mp3'
  },
  {
      title: "Fur Cue",
      artist: 'Seether',
      album: 'Holding Onto Strings Better Left To Fray',
      coverUrl: 'holding-onto-strings-better-left-to-fray.jpg',
      src: 'Seether - Fur Cue.mp3'
  },
  {
      title: 'Simplest Mistake',
      artist: 'Seether',
      album: 'Karma And Effect',
      coverUrl: 'karma-and-effect.jpg',
      src: 'Seether - Simplest Mistake.mp3'
  },
  {
      title: "The Guardian (Ellie's Song)",
      artist: 'Shawn James',
      album: 'The Guardian',
      coverUrl: 'the-guardian.jpg',
      src: "Shawn James - The Guardian (Ellie's Song).mp3"
  },
  {
      title: 'All The Same',
      artist: 'Sick Puppies',
      album: 'Dressed Up As Life',
      coverUrl: 'dressed-up-as-life.jpg',
      src: 'Sick Puppies - All The Same.mp3'
  },
  {
      title: "You're Going Down",
      artist: 'Sick Puppies',
      album: 'Tri-Polar',
      coverUrl: 'tri-polar.jpg',
      src: "Sick Puppies - You're Going Down.mp3"
  },
  {
      title: 'Vicarious',
      artist: 'Tool',
      album: '10, 000 Days',
      coverUrl: '10, 000-days.jpg',
      src: 'Tool - Vicarious.mp3'
  },
  {
      title: 'Schism',
      artist: 'Tool',
      album: 'Lateralus',
      coverUrl: 'lateralus.jpg',
      src: 'Tool - Schism.mp3'
  },
  {
      title: 'Parabola',
      artist: 'Tool',
      album: 'Lateralus',
      coverUrl: 'lateralus.jpg',
      src: 'Tool - Parabola.mp3'
  },
  {
      title: 'The Pot',
      artist: 'Tool',
      album: '10, 000 Days',
      coverUrl: '10, 000-days.jpg',
      src: 'Tool - The Pot.mp3'
  },
];

export const tracks = mockTracks.map((track) => {
    return {...track, id: crypto.randomUUID()};
})

export const playlists: PlaylistModel[] = [
    {
        id: crypto.randomUUID(),
        name: 'Favorites',
        dateOfCreation: `${new Date().getUTCDate()}`,
        dateOfUpdate: `${new Date().getUTCDate()}`,
        tracks: [tracks[4], tracks[15], tracks[19]],
        coverUrl: tracks[17].coverUrl!,
        user: 'MonkeyBoy'
    },
];

const mockAlbums: Omit<AlbumModel, 'id' | 'tracks'>[] = [
    {
        title: 'Mer de Noms',
        artist: 'A Perfect Circle',
        coverUrl: 'mer-de-noms.jpg',
        releaseDate: '2000',
    },
    {
        artist: 'A Perfect Circle',
        title: 'Thirteenth Step',
        coverUrl: 'thirteenth-step.jpg',
        releaseDate: '2003'
    },
    {
        artist: 'Bring Me The Horizon',
        title: 'Post Human: Survival Horror',
        coverUrl: 'post-human-survival-horror.jpg',
        releaseDate: '2020'
    },
    {
        artist: 'Incubus',
        title: 'Light Grenades',
        coverUrl: 'light-grenades.jpg',
        releaseDate: '2006',
    },
    {
        artist: 'Incubus',
        title: 'Make Yourself',
        coverUrl: 'make-yourself.jpg',
        releaseDate: '1999'
    },
    {
        artist: 'Maroon 5',
        title: 'Songs About Jane',
        coverUrl: 'songs-about-jane.jpg',
        releaseDate: '2002'
    },
    {
        artist: 'Maroon 5',
        title: "It Won`t Be Soon Before Long",
        coverUrl: 'wake-up-call.jpg',
        releaseDate: '2007'
    },
    {
        artist: 'Poets Of The Fall',
        title: 'Carnival Of Rust',
        coverUrl: 'carnival-of-rust.jpg',
        releaseDate: '2006'
    },
    {
        artist: 'Poets Of The Fall',
        title: 'Twilight Theater',
        coverUrl: 'twilight-theater.jpg',
        releaseDate: '2010'
    },
    {
        artist: 'Seether',
        title: 'Holding Onto Strings Better Left To Fray',
        coverUrl: 'holding-onto-strings-better-left-to-fray.jpg',
        releaseDate: '2011'
    },
    {
        artist: 'Seether',
        title: 'Karma And Effect',
        coverUrl: 'karma-and-effect.jpg',
        releaseDate: '2005'
    },
    {
        artist: 'Shawn James',
        title: 'The Guardian',
        coverUrl: 'the-guardian.jpg',
        releaseDate: '2020'
    },
    {
        artist: 'Sick Puppies',
        title: 'Dressed Up As Life',
        coverUrl: 'dressed-up-as-life.jpg',
        releaseDate: '2007'
    },
    {
        artist: 'Sick Puppies',
        title: 'Tri-Polar',
        coverUrl: 'tri-polar.jpg',
        releaseDate: '2009'
    },
    {
        artist: 'Tool',
        title: '10, 000 Days',
        coverUrl: '10, 000-days.jpg',
        releaseDate: '2006'
    },
    {
        artist: 'Tool',
        title: 'Lateralus',
        coverUrl: 'lateralus.jpg',
        releaseDate: '2001'
    }
]

function getTracks (searchField: keyof TrackModel, searchValue: string) {
    return tracks.filter((track) => track[searchField] === searchValue);
}

export const albums: AlbumModel[] = mockAlbums.map((album) => {
    return {
        ...album,
        id: crypto.randomUUID(),
        tracks: getTracks('album', album.title),
    }
})

const mockArtists: Omit<ArtistModel, 'id' | 'tracks'>[] = [
    {
        name: 'Tool',
        imageUrl: 'tool.jpg',
        genres: ['Progressive metal', 'Metal', 'Alternative metal']
    },
    {
        name: 'A Perfect Circle',
        imageUrl: 'a-perfect-circle.jpg',
        genres: ['Alternative metal', 'Alternative rock', 'Hard rock', 'Progressive rock']
    },
    {
        name: 'Bring Me The Horizon',
        imageUrl: 'bring-me-the-horizon.jpg',
        genres: ['Metalcore', 'Alternative rock', 'Post-hardcore', 'Alternative metal']
    },
    {
        name: 'Incubus',
        imageUrl: 'incubus.jpg',
        genres: ['Alternative rock', 'Alternative metal', 'Funk-rock', 'Nu metal']
    },
    {
        name: 'Maroon 5',
        imageUrl: 'maroon-5.jpg',
        genres: ['Pop rock', 'Pop', 'Alternative rock', 'Funk-rock']
    },
    {
        name: 'Poets Of The Fall',
        imageUrl: 'poets-of-the-fall.jpg',
        genres: ['Alternative rock', 'Indie rock', 'Post-grunge']
    },
    {
        name: 'Seether',
        imageUrl: 'seether.jpg',
        genres: ['Post-grunge', 'Alternative metal', 'Alternative rock', 'Nu metal', 'Hard rock']
    },
    {
        name: 'Shawn James',
        imageUrl: 'shawn-james.jpg',
        genres: ['Blues', 'Soul']
    },
    {
        name: 'Sick Puppies',
        imageUrl: 'sick-puppies.jpg',
        genres: ['Alternative rock', 'Post-grunge', 'Hard rock', 'Nu metal']
    },
];

export const artists: ArtistModel[] = mockArtists.map((artist) => {
    return {
        ...artist,
        id: crypto.randomUUID(),
        tracks: getTracks('artist', artist.name)
    }
})

