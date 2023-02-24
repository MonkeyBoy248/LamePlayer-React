/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppDispatch, RootState } from '@/app/store';
import { AlertModal } from '@/components/AlertModal/AlertModal';
import { EmptyMessage } from '@/components/EmptyMessage/EmptyMessage';
import { IconButton } from '@/components/IconButton/IconButton';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { EditTitleInput } from '@/features/Playlists/components/EditTitleInput/EditTitleInput';
import { getTracksAmount } from '@/features/Playlists/helpers/getTracksAmount';
import { getUpdateTime } from '@/features/Playlists/helpers/getUpdateTime';
import { changePlaylistTitle, removePlaylistById, removeTrackFromPlaylist } from '@/features/Playlists/playlistsSlice';
import { selectPlaylistById } from '@/features/Playlists/selectors';
import TrackList from '@/features/Tracks/components/TrackList/TrackList';
import { addToPlaybackQueue, setCurrentTrackIndex, setPlaybackQueue } from '@/features/Tracks/tracksSlice';
import { iconIds } from '@/utils/config/iconIds';
import { usePopUp } from '@/utils/hooks/usePopUp';
import { useSearchTrack } from '@/utils/hooks/useSearch';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Playlist.module.scss';

export const Playlist: FC = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const playlist = useSelector((state: RootState) => selectPlaylistById(state, id!));
  const [title, setTitle] = useState<string>(playlist.title);
  const { searchResults, searchTrack } = useSearchTrack(playlist.tracks);
  const navigate = useNavigate();
  const { isPopUpOpen, closePopUp, showPopUp } = usePopUp();

  const getDateOfCreation = (): string => {
    return new Date(playlist.dateOfCreation).toLocaleDateString();
  };

  const deleteTrackFromPlaylist = (trackId: string): void => {
    dispatch(removeTrackFromPlaylist({ trackId, playlistId: id! }));
  };

  const displaySearchResults = (): JSX.Element => {
    if (searchResults.length === 0) {
      return <EmptyMessage title={'Nothing found'} />;
    }

    return <TrackList tracks={searchResults} playlistId={id!} onDelete={deleteTrackFromPlaylist} />;
  };

  const runPlayllist = (): void => {
    dispatch(setPlaybackQueue(playlist.tracks));
    dispatch(setCurrentTrackIndex(0));
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const newTitle = e.currentTarget.value;

    setTitle(newTitle);
  };

  const editPlaylistTitle = (): void => {
    if (!title) {
      setTitle(playlist.title);
      dispatch(changePlaylistTitle({ id: playlist.id, title: playlist.title }));

      return;
    }

    if (title === playlist.title) {
      return;
    }

    dispatch(changePlaylistTitle({ id: playlist.id, title }));
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') {
      return;
    }

    e.currentTarget.blur();
  };

  const removePlaylist = (): void => {
    dispatch(removePlaylistById(id!));
    navigate('/playlists');
  };

  const addPlaylistTracksToPlaybackQueue = (): void => {
    dispatch(addToPlaybackQueue(playlist.tracks));
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
                  onClick={showPopUp}
                />
              )}
            </div>
          </div>
        </header>
        <SearchBar onInput={searchTrack} />
        {playlist.tracks.length > 0 ? (
          displaySearchResults()
        ) : (
          <EmptyMessage title={'The playlist is empty'} message={'Add some tracks to the playlist!'} />
        )}
      </div>
      <AlertModal
        isOpen={isPopUpOpen}
        closeModal={closePopUp}
        onCancel={closePopUp}
        onConfirm={removePlaylist}
        text={'Are you sure you want to delete the playlist? This action cannot be undone.'}
        confirmText={'Yes'}
        cancelText={'No'}
      />
    </section>
  );
};
