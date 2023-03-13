import { FC, MouseEventHandler, useRef, useState } from 'react';
import styles from './Track.module.scss';
import { Link } from 'react-router-dom';
import { TrackModel } from '@interfaces/Track';
import Icon from '@components/Icon';
import { iconIds } from '@utils/config/iconIds';
import { FavoritesButton } from '@/components/FavoritesButton';
import { getTrackFullSrc } from '@/features/Controls/helpers/getTrackFullSrc';
import { formatTime } from '@/utils/helpers/formatTime/formatTime';
import { useEventListener } from '@/utils/hooks/useEventListener';
import { IconButton } from '@/components/IconButton/IconButton';

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

const Track: FC<TrackProps> = ({
  track,
  onPlay,
  dataIndex,
  isActive,
  isPlaying,
  playlistId,
  onAddToPlaylist,
  onDelete,
}: TrackProps): JSX.Element => {
  const audioRef = useRef(new Audio(getTrackFullSrc(track.src)));
  const [trackDuration, setTrackDuration] = useState<number>(0);

  const getDuration = (): void => {
    const duration = audioRef.current.duration;

    setTrackDuration(duration);
  };

  useEventListener(audioRef, 'loadedmetadata', getDuration);

  const getPlayButtonIconId = (): string => {
    if (isActive && isPlaying) {
      return iconIds.pause;
    }

    return iconIds.play;
  };

  return (
    <li className={`${styles.track} ${isActive ? styles.track_active : ''}`}>
      <div className={styles.track__inner}>
        <div className={styles.track__trackInfoWrapper}>
          <div className={styles.track__coverWrapper}>
            <button className={`${styles.track__playButton} _playButton`} data-index={dataIndex} onClick={onPlay}>
              <Icon id={getPlayButtonIconId()} width="1.5em" height="1.5em" />
            </button>
            <img
              className={styles.track__cover}
              src={`/images/covers/${track.coverUrl}`}
              alt={`${track.album} cover`}
            />
          </div>
          <div className={styles.track__trackInfo}>
            <Link className={styles.track__name} to={`/track/${track.id}`}>
              {track.title}
            </Link>
            <p className={styles.track__band}>{track.artist}</p>
          </div>
        </div>
        <div className={styles.track__controlsWrapper}>
          <FavoritesButton width="1.5em" height="1.5em" track={track} />
          <IconButton
            iconId={iconIds.delete}
            width="1.5em"
            height="1.5em"
            fill="var(--controls-svg)"
            className={styles.track__deleteButton}
            onClick={(): void => onDelete(track.id, playlistId)}
          />
          <IconButton
            iconId={iconIds.add}
            width="1em"
            height="1em"
            fill="var(--controls-svg)"
            className={styles.track__addToPlaylist}
            onClick={(): void => onAddToPlaylist(track)}
          />
          <p className={styles.track__duration}>{formatTime(trackDuration)}</p>
        </div>
      </div>
    </li>
  );
};

export default Track;
