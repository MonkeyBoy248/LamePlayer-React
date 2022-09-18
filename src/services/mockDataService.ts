import { TrackData } from "../interfaces/Track";
import { v4 as uuidv4 } from "uuid";

const mockTracks: Omit<TrackData, 'id'>[] = [
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

