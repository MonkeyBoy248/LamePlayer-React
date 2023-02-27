import React, { FC } from 'react';
import Track from '../Track/Track';
import styles from './TrackList.module.scss';
import { TrackModel } from '@interfaces/Track';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { setCurrentTrackIndex, setIsPlaying, setPlaybackQueue } from '../../tracksSlice';
import { AddToPlaylistPopup } from '@/features/Playlists/components/AddToPlaylistPopup/AddToPlaylistPopup';
import { usePopUp } from '@/utils/hooks/usePopUp';
import { isTrackActive } from '../../helpers/isTrackActive';
import { useAddToPlaylist } from '@/features/Playlists/hooks/useAddToPlaylist';
import { useInitTrackList } from '../../hooks/useInitTrackList';

interface TrackListProps {
  tracks: TrackModel[];
  playlistId?: string;
  onDelete: (trackId: string, playlistId?: string) => void;
}

const TrackList: FC<TrackListProps> = ({ tracks, onDelete, playlistId }: TrackListProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { currentTrack, currentTrackIndex, isPlaying } = useInitTrackList();
  const { isPopUpOpen, closePopUp, showPopUp } = usePopUp();
  const { trackToAdd, addToPlaylist } = useAddToPlaylist(showPopUp);

  const setCurrentTrack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const trackItemIndex = Number(e.currentTarget.dataset.index);
    dispatch(setPlaybackQueue(tracks));

    if (currentTrackIndex === trackItemIndex) {
      dispatch(setIsPlaying(!isPlaying));

      return;
    }

    dispatch(setCurrentTrackIndex(trackItemIndex));
  };

  return (
    <>
      <ul className={styles.trackList}>
        {tracks.map((track: TrackModel, index: number) => {
          return (
            <Track
              track={track}
              isActive={isTrackActive(track, currentTrack)}
              dataIndex={index}
              key={track.id}
              isPlaying={isPlaying}
              playlistId={playlistId}
              onPlay={setCurrentTrack}
              onAddToPlaylist={addToPlaylist}
              onDelete={onDelete}
            />
          );
        })}
      </ul>
      <AddToPlaylistPopup isOpen={isPopUpOpen} trackToAdd={trackToAdd} closeModal={closePopUp} />
    </>
  );
};

export default TrackList;
