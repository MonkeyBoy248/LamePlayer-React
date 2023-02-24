import React, { FC, useState } from 'react';
import Track from '../Track/Track';
import styles from './TrackList.module.scss';
import { TrackModel } from '@interfaces/Track';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { setCurrentTrackIndex, setIsPlaying, setPlaybackQueue } from '../../tracksSlice';
import { selectCurrentTrack, selectCurrentTrackIndex, selectPlayingStatus } from '../../selectors';
import { AddToPlaylistPopup } from '@/features/Playlists/components/AddToPlaylistPopup/AddToPlaylistPopup';
import { usePopUp } from '@/utils/hooks/usePopUp';
import { isTrackActive } from '../../helpers/isTrackActive';

interface TrackListProps {
  tracks: TrackModel[];
  playlistId?: string;
  onDelete: (trackId: string, playlistId?: string) => void;
}

const TrackList: FC<TrackListProps> = ({ tracks, onDelete, playlistId }: TrackListProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const currentTrackIndex = useSelector(selectCurrentTrackIndex);
  const currentTrack = useSelector(selectCurrentTrack);
  const isPlaying = useSelector(selectPlayingStatus);
  const { isPopUpOpen, closePopUp, showPopUp } = usePopUp();
  const [trackToAdd, setTrackToAdd] = useState<TrackModel>({} as TrackModel);

  const setCurrentTrack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const trackItemIndex = Number(e.currentTarget.dataset.index);
    dispatch(setPlaybackQueue(tracks));

    if (currentTrackIndex === trackItemIndex) {
      dispatch(setIsPlaying(!isPlaying));

      return;
    }

    dispatch(setCurrentTrackIndex(trackItemIndex));
  };

  const addToPlaylist = (track: TrackModel): void => {
    setTrackToAdd(track);
    showPopUp();
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
