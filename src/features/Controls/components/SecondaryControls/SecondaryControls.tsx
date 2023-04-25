import { IconButton } from '@/components/IconButton/IconButton';
import styles from './SecondaryControls.module.scss';
import { iconIds } from '@/utils/config/iconIds';
import { TrackModel } from '@/interfaces/Track';
import { usePlaybackQueue } from '../../hooks/usePlaybackQueue';
import { useMenu } from '@/utils/hooks/useMenu';
import { FC } from 'react';
import { TrackContextMenu } from '@/features/Tracks/components/TrackMenu/TrackMenu';

interface SecondaryControlsProps {
  currentTrack: TrackModel;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
}

export const SecondaryControls: FC<SecondaryControlsProps> = ({ currentTrack, audioRef }: SecondaryControlsProps) => {
  const { isShuffled, toggleShuffleStatus } = usePlaybackQueue(audioRef);
  const { isMenuOpen, anchorElement, closeMenu, setAnchor, toggleMenu } = useMenu<HTMLButtonElement>();

  const showTrackMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchor(e.currentTarget);
    toggleMenu();
  };

  return (
    <div className={styles.secondaryControls}>
      <IconButton
        iconId={iconIds.dots}
        fill="var(--controls-svg)"
        width="2em"
        height="2em"
        isDisabled={!currentTrack}
        className={styles.secondaryControls__optionsButton}
        onClick={showTrackMenu}
      />
      <IconButton
        className={styles.secondaryControls__shuffleButton}
        iconId={iconIds.shuffle}
        fill={isShuffled ? 'var(--accent)' : 'var(--controls-svg)'}
        width="2em"
        height="2em"
        onClick={toggleShuffleStatus}
      />
      <TrackContextMenu anchorElement={anchorElement} onClose={closeMenu} track={currentTrack} isOpen={isMenuOpen} />
    </div>
  );
};
