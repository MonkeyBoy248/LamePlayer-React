import { AppDispatch } from '@/app/store';
import { DialogModal } from '@/components/DialogModal/DialogModal';
import { PlaylistModel } from '@/interfaces/Playlist';
import { TrackModel } from '@/interfaces/Track';
import { useDispatch, useSelector } from 'react-redux';
import { addTracksToTheNewPlaylist, addTrackToPlaylist, removeTrackFromPlaylist } from '../../playlistsSlice';
import { selectAllPlaylists } from '../../selectors';
import { AddToPlaylistPopupItem } from '../AddToPlaylistPopupItem/AddToPlaylistPopupItem';
import styles from './AddToPlaylistPopup.module.scss';

interface PlaylistPopupProps {
  isOpen: boolean;
  closeModal: () => void;
  trackToAdd: TrackModel;
}

export const AddToPlaylistPopup = ({ isOpen, closeModal, trackToAdd }: PlaylistPopupProps) => {
  const dispatch: AppDispatch = useDispatch();
  const allPlaylistsMap = useSelector(selectAllPlaylists);
  const allPlaylists = Object.values(allPlaylistsMap);

  const isTrackInPlaylist = (playlist: PlaylistModel) => {
    const trackIndex = playlist.tracks.findIndex((track) => track.id === trackToAdd.id);

    return trackIndex !== -1;
  }

  const createPlaylistWithTheTrack = () => {
    dispatch(addTracksToTheNewPlaylist([trackToAdd]));
    closeModal();
  }

  const addTrack = (e: React.MouseEvent<HTMLLIElement>) => {
    const playlistId = e.currentTarget.dataset.id!;
    const playlist = allPlaylistsMap[playlistId];
    const isInPlaylist = isTrackInPlaylist(playlist);

    if (isInPlaylist) {
      dispatch(removeTrackFromPlaylist({ trackId: trackToAdd.id, playlistId }));

      return;
    }

    dispatch(addTrackToPlaylist({ track: trackToAdd, playlistId }))
  }

  return (
    <DialogModal isOpen={isOpen} closeModal={closeModal} title={'Choose a playlist'}>
      <ul className={styles.addToPlaylistPopup__playlists}>
        {
          allPlaylists.length > 0  &&
          allPlaylists.map((playlist) => {
            return <AddToPlaylistPopupItem
              key={playlist.id}
              title={playlist.title}
              onClick={addTrack}
              dataId={playlist.id}
              inPlaylist={isTrackInPlaylist(playlist)}
            />
          })
        }
        <hr className={styles.addToPlaylistPopup__divider}/>
        <AddToPlaylistPopupItem title={'Add to new playlist'} onClick={createPlaylistWithTheTrack}/>
      </ul>
    </DialogModal>
  )
}
