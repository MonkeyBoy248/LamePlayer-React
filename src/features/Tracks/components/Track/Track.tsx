import React from "react";
import styles from './Track.module.scss';
import { Link } from 'react-router-dom';
import { TrackModel } from "@interfaces/Track";
import Icon from "@components/Icon";
import { iconIds } from "@utils/config/iconIds";
import { useDispatch } from "react-redux";
import { setNewCurrentTrack } from "@features/Tracks/trackSlice";

interface TrackProps {
  track: TrackModel;
}

const Track = ({ track }: TrackProps) => {
  const blockName = 'track';
  const dispatch = useDispatch();

  return (
    <li className={styles.track} onClick={() => dispatch(setNewCurrentTrack(track.id))}>
      <div className={styles.track__inner}>
        <div className={styles.track__trackInfoWrapper}>
          <div className={styles.track__coverWrapper}>
            <button className={`${styles.track__playButton} _playButton`}>
              <Icon id={iconIds.play} width="1.5em" height="1.5em" blockName={blockName}></Icon>
            </button>
            <img className={styles.track__cover} src={`/images/covers/${track.coverUrl}`} alt={`${track.album} cover`} />
          </div>
          <div className={styles.track__trackInfo}>
              <Link className={styles.track__name} to={`/track/${track.id}`}>{track.name}</Link>
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

