import React, { useEffect, useRef } from 'react';
import Icon from '../Icon';
import styles from './Controls.module.scss';
import { iconIds } from '@utils/config/iconIds';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { setIsPlaying } from '@features/Tracks/trackSlice';

const Controls = () => {
  const blockName = 'controls'
  const dispatch: AppDispatch = useDispatch();
  const currentTrack = useSelector((state: RootState) => state.tracks.currentTrack);
  const isPlaying = useSelector((state: RootState) => state.tracks.isPlaying);
  const audioRef = useRef(new Audio(`tracks/${currentTrack.src}`));

  useEffect(() => {
      if (!isPlaying) {
        audioRef.current.pause();

        return;
      }

      audioRef.current.play().then();
  },
    [isPlaying])

  return (
    <div className={styles.controls}>
      <div className={styles.controls__progressBar}></div>
      <div className={`${styles.controls__inner} _container`}>
        <div className={styles.controls__mainControls}>
          <button className={styles.controls__prevButton}>
            <Icon id={iconIds.prev} width='1.5em' height='1.5em' blockName={blockName} fill='#E5E5E5'/>
          </button>
          <button
            className={styles.controls__playButton}
            onClick={() => dispatch(setIsPlaying(!isPlaying))}
          >
            <Icon id={isPlaying ? iconIds.pause : iconIds.play} width='2em' height='2em' blockName={blockName} fill='#E5E5E5' />
          </button>
          <button className={styles.controls__nextButton}>
            <Icon id={iconIds.next} width='1.5em' height='1.5em' blockName={blockName} fill='#E5E5E5'/>
          </button>
          <button className={styles.controls__repeatButton}>
            <Icon id={iconIds.repeat} fill='#E5E5E5' width='1.75em' height='1.75em' blockName={blockName}/>
          </button>
          <button className={styles.controls__playlistsButton}>
            <Icon id={iconIds.playlists} fill='#E5E5E5' width='1.75em' height='1.75em' blockName={blockName}/>
          </button>
            <div className={styles.controls__trackInfo}>
            <figure className={styles.controls__trackCoverWrapper}>
              <img src={ `images/covers/${currentTrack.coverUrl }` } alt={ currentTrack.src }/>
            </figure>
            <div className={styles.controls__trackDetails}>
              <p className={`${styles.controls__trackTitle} _text`}>{ currentTrack.title }</p>
              <p className={`${styles.controls__artist} _text`}>{ currentTrack.artist }</p>
            </div>
          </div>
        </div>
        <div className={styles.controls__secondaryControls}>
          <button className={styles.controls__optionsButton}>
            <Icon id={iconIds.dots} fill='#E5E5E5' width='2em' height='2em' blockName={blockName}/>
          </button>
          <button className={styles.controls__volumeButton}>
            <Icon id={iconIds.mid} fill='#E5E5E5' width='2.5em' height='2.5em' blockName={blockName}/>
          </button>
          <button className={styles.controls__shuffleButton}>
            <Icon id={iconIds.shuffle} fill='#E5E5E5' width='2em' height='2em' blockName={blockName}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Controls;