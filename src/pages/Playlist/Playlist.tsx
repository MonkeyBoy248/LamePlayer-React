import { AlertModal } from '@/components/AlertModal/AlertModal';
import { EmptyMessage } from '@/components/EmptyMessage/EmptyMessage';
import { IconButton } from '@/components/IconButton/IconButton';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { EditTitleInput } from '@/features/Playlists/components/EditTitleInput/EditTitleInput';
import { getTracksAmount } from '@/features/Playlists/helpers/getTracksAmount';
import { getUpdateTime } from '@/features/Playlists/helpers/getUpdateTime';
import { useInitPlaylist } from '@/features/Playlists/hooks/useInitPlaylist';
import { usePlaylistControls } from '@/features/Playlists/hooks/usePlaylistControls';
import { usePlaylistTitle } from '@/features/Playlists/hooks/usePlaylistTitle';
import TrackList from '@/features/Tracks/components/TrackList/TrackList';
import { iconIds } from '@/utils/config/iconIds';
import { useSearchTrack } from '@/features/Tracks/hooks/useSearchTrack';
import { FC } from 'react';
import styles from './Playlist.module.scss';
import { useModals } from '@/contexts/ModalsContext';

export const Playlist: FC = (): JSX.Element => {
  const playlist = useInitPlaylist();
  const { addPlaylistTracksToPlaybackQueue, removePlaylist, deleteTrackFromPlaylist, runPlayllist } =
    usePlaylistControls(playlist);
  const { title, editPlaylistTitle, handleEnterKeyDown, handleInputChange } = usePlaylistTitle(playlist);
  const { searchResults, searchTrack } = useSearchTrack(playlist.tracks);
  const { openModal, closeModal } = useModals();

  const getDateOfCreation = (): string => {
    return new Date(playlist.dateOfCreation).toLocaleDateString();
  };

  const displaySearchResults = (): JSX.Element => {
    if (searchResults.length === 0) {
      return <EmptyMessage title={'Nothing found'} />;
    }

    return <TrackList tracks={searchResults} playlistId={playlist.id} onDelete={deleteTrackFromPlaylist} />;
  };

  const openDeletePlaylistAlert = (): void => {
    openModal(
      <AlertModal
        closeModal={closeModal}
        onCancel={closeModal}
        onConfirm={removePlaylist}
        text={'Are you sure you want to delete the playlist? This action cannot be undone.'}
        confirmText={'Yes'}
        cancelText={'No'}
      />
    );
  };

  return (
    <section className={`${styles.playlist} _page`}>
      <div className={`playlist__inner _container`}>
        <header className={styles.playlist__header}>
          <div className={styles.playlist__coverWrapper}>
            <img
              className={styles.playlist__coverImg}
              src={`/images/covers/${playlist.coverUrl}`}
              alt={`${playlist.title} cover`}
            />
          </div>
          <div className={styles.playlist__infoWrapper}>
            <div className={styles.playlist__info}>
              <p className={styles.playlist__itemLabel}>Playlist</p>
              {playlist.createdByUser ? (
                <EditTitleInput
                  title={title}
                  onChange={handleInputChange}
                  onBlur={editPlaylistTitle}
                  onKeyDown={handleEnterKeyDown}
                />
              ) : (
                <h1 className={`${styles.playlist__title} _pageTitle`}>{playlist.title}</h1>
              )}
              <p className={styles.playlist__user}>{playlist.user}</p>
              <p
                className={`${styles.playlist__dateOfCreation} ${styles._date}`}
              >{`Created: ${getDateOfCreation()}`}</p>
              <p className={`${styles.playlist__dateOfUpdate} ${styles._date}`}>{`Last update: ${getUpdateTime(
                playlist.dateOfUpdate
              )}`}</p>
              <p className={styles.playlist__tracksAmount}>{getTracksAmount(playlist)}</p>
            </div>
            <div className={styles.playlist__controls}>
              <IconButton
                isDisabled={playlist.tracks.length === 0}
                iconId={iconIds.play}
                height="2em"
                width="2em"
                className={`${styles.playlist__playButton} _playButton`}
                onClick={runPlayllist}
              />
              <IconButton
                iconId={iconIds.playbackQueue}
                isDisabled={playlist.tracks.length === 0}
                height="2em"
                width="2em"
                fill={'var(--controls-svg)'}
                className={styles.playlist__addToPlayback}
                onClick={addPlaylistTracksToPlaybackQueue}
              />
              {playlist.createdByUser && (
                <IconButton
                  iconId={iconIds.delete}
                  height="1.5em"
                  width="1.5em"
                  fill="var(--controls-svg)"
                  className={styles.playlist__delete}
                  onClick={openDeletePlaylistAlert}
                />
              )}
            </div>
          </div>
        </header>
        <SearchBar onChange={searchTrack} />
        {playlist.tracks.length > 0 ? (
          displaySearchResults()
        ) : (
          <EmptyMessage title={'The playlist is empty'} message={'Add some tracks to the playlist!'} />
        )}
      </div>
    </section>
  );
};
