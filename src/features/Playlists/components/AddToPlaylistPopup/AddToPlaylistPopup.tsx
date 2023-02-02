import { AppDispatch } from '@/app/store';
import { DialogModal } from '@/components/DialogModal/DialogModal';
import { PlaylistModel } from '@/interfaces/Playlist';
import { TrackModel } from '@/interfaces/Track';
import { useDispatch, useSelector } from 'react-redux';
import { addTrackToTheNewPlaylist, addTrackToPlaylist, removeTrackFromPlaylist } from '../../playlistsSlice';
import { selectFavorites, selectPlaylists } from '../../selectors';
import { PlaylistPopupItem } from '../AddToPlaylistPopupItem/AddToPlaylistPopupItem';
import styles from './PlaylistPopup.module.scss';

interface PlaylistPopupProps {
  isOpen: boolean;
  closeModal: () => void;
  trackToAdd: TrackModel;
}

export const AddToPlaylistPopup = ({ isOpen, closeModal, trackToAdd }: PlaylistPopupProps) => {
  const dispatch: AppDispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const playlistsMap = useSelector(selectPlaylists);
  const playlists = Object.values(playlistsMap);
  const allPlaylists = [favorites, ...playlists];

  const isTrackInPlaylist = (playlist: PlaylistModel) => {
    const trackIndex = playlist.tracks.findIndex((track) => track.id === trackToAdd.id);

    return trackIndex !== -1;
  }

  const createPlaylistWithTheTrack = () => {
    dispatch(addTrackToTheNewPlaylist(trackToAdd));
    closeModal();
  }

  const addTrack = (e: React.MouseEvent<HTMLLIElement>) => {
    const playlistId = e.currentTarget.dataset.id!;
    const playlist = playlistsMap[playlistId];
    const isInPlaylist = isTrackInPlaylist(playlist);

    if (isInPlaylist) {
      dispatch(removeTrackFromPlaylist({ trackId: trackToAdd.id, playlistId }));
      closeModal();

      return;
    }

    dispatch(addTrackToPlaylist({ track: trackToAdd, playlistId }))
    closeModal();
  }

  return (
    <DialogModal isOpen={isOpen} closeModal={closeModal} title={'Choose a playlist'}>
      <ul className={styles.playlistPopup__playlists}>
        {
          allPlaylists.length > 0  &&
          allPlaylists.map((playlist) => {
            return <PlaylistPopupItem
              key={playlist.id}
              title={playlist.title}
              onClick={addTrack}
              dataId={playlist.id}
              inPlaylist={isTrackInPlaylist(playlist)}
            />
          })
        }
        <PlaylistPopupItem title={'Add to new playlist'} onClick={createPlaylistWithTheTrack}/>
      </ul>
    </DialogModal>
  )
}
