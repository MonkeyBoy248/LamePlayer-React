import React, { MouseEventHandler } from "react";
import styles from './Track.module.scss';
import { Link } from 'react-router-dom';
import { TrackModel } from "@interfaces/Track";
import Icon from "@components/Icon";
import { iconIds } from "@utils/config/iconIds";
import { FavoritesButton } from '@/components/FavoritesButton';


interface TrackProps {
  track: TrackModel;
  dataIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  playlistId?: string;
  onPlay: MouseEventHandler<HTMLButtonElement>;
  onAddToPlaylist: (track: TrackModel) => void;
  onDelete: (trackId: string, playlistId?: string) => void;
}

const Track = (
  {
    track,
    onPlay,
    dataIndex,
    isActive,
    isPlaying,
    playlistId,
    onAddToPlaylist,
    onDelete
  }: TrackProps) => {
  const getPlayButtonIconId = () => {
    if (isActive && isPlaying) {
      return iconIds.pause;
    }

    return iconIds.play
  }

  return (
    <li className={`${styles.track} ${isActive ? styles.track_active : ''}`}>
      <div className={styles.track__inner}>
        <div className={styles.track__trackInfoWrapper}>
          <div className={styles.track__coverWrapper}>
            <button
              className={`${styles.track__playButton} _playButton`}
              data-index={dataIndex}
              onClick={onPlay}>
              <Icon
                id={getPlayButtonIconId()}
                width="1.5em"
                height="1.5em"
              />
            </button>
            <img className={styles.track__cover} src={`/images/covers/${track.coverUrl}`} alt={`${track.album} cover`} />
          </div>
          <div className={styles.track__trackInfo}>
              <Link className={styles.track__name} to={`/track/${track.id}`}>{track.title}</Link>
              <p className={styles.track__band}>{track.artist}</p>
            </div>
          </div>
          <div className={styles.track__controlsWrapper}>
            <FavoritesButton
              width='1.5em'
              height='1.5em'
              track={track}
              />
            <button className={styles.track__deleteButton} onClick={() => onDelete(track.id, playlistId)}>
              <Icon id={iconIds.delete} width='1.5em' height='1.5em' fill='var(--controls-svg)'></Icon>
            </button>
            <button className={styles.track__addToPlaylist} onClick={() => onAddToPlaylist(track)}>
            <Icon
                id={iconIds.add}
                width="1em"
                height="1em"
                fill='var(--controls-svg)'
              />
            </button>
            <p className={styles.track__duration}>0:00</p>
          </div>
      </div>
    </li>
  )
}

export default Track;

