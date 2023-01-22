import React, { MouseEventHandler } from "react";
import styles from './Track.module.scss';
import { Link } from 'react-router-dom';
import { TrackModel } from "@interfaces/Track";
import Icon from "@components/Icon";
import { iconIds } from "@utils/config/iconIds";


interface TrackProps {
  track: TrackModel;
  dataIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Track = ({ track, onClick, dataIndex, isActive, isPlaying }: TrackProps) => {
  const blockName = 'track';

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
              onClick={onClick}>
              <Icon
                id={getPlayButtonIconId()}
                width="1.5em" height="1.5em"
                blockName={blockName}
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
            <button className={styles.track__addToFavoritesButton}>
              <Icon id={iconIds.like} width='1.5em' height='1.5em' blockName={blockName} fill='#E5E5E5'></Icon>
            </button>
            <button className={styles.track__deleteButton}>
              <Icon id={iconIds.delete} width='1.5em' height='1.5em' blockName={blockName} fill='#E5E5E5'></Icon>
            </button>
            <button className={styles.track__addToPlaylist}>+</button>
            <p className={styles.track__duration}>0:00</p>
          </div>
      </div>
    </li>
  )
}

export default Track;

