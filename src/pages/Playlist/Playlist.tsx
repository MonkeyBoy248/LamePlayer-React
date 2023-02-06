import { AppDispatch, RootState } from '@/app/store'
import { AlertModal } from '@/components/AlertModal/AlertModal'
import { EmptyMessage } from '@/components/EmptyMessage/EmptyMessage'
import { IconButton } from '@/components/IconButton/IconButton'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { EditTitleInput } from '@/features/Playlists/components/EditTitleInput/EditTitleInput'
import { getTracksAmount } from '@/features/Playlists/helpers/getTracksAmount'
import { getUpdateTime } from '@/features/Playlists/helpers/getUpdateTime'
import { changePlaylistTitle, removePlaylistById, removeTrackFromPlaylist } from '@/features/Playlists/playlistsSlice'
import { selectFavoritesId, selectPlaylistById } from '@/features/Playlists/selectors'
import TrackList from '@/features/Tracks/components/TrackList/TrackList'
import { setCurrentTrackIndex, setPlaybackQueue } from '@/features/Tracks/tracksSlice'
import { iconIds } from '@/utils/config/iconIds'
import { filterArrayByKeys } from '@/utils/helpers/filterArrayByKeys'
import { useModal } from '@/utils/hooks/useModal'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Playlist.module.scss'

export const Playlist = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const playlist = useSelector((state: RootState) => selectPlaylistById(state, id!));
  const [title, setTitle] = useState<string>(playlist.title);
  const favoritesId = useSelector(selectFavoritesId);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchResults = useMemo(() => {
    if (!searchTerm) {
      return playlist.tracks;
    }

    return filterArrayByKeys(playlist.tracks, ['artist', 'title'], searchTerm);
  }, [searchTerm, playlist.tracks]);
  const navigate = useNavigate();
  const { isOpen, closeModal, openModal } = useModal();

  const getDateOfCreation = (): string => {
    return new Date(playlist.dateOfCreation).toLocaleDateString();
  }

  const searchTrack = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchTerm(e.currentTarget.value);
  }

  const deleteTrackFromPlaylist = (trackId: string) => {
    dispatch(removeTrackFromPlaylist({trackId, playlistId: id!}))
  }

  const displaySearchResults = (): JSX.Element => {
    if (searchResults.length === 0) {
      return <EmptyMessage title={'Nothing found'}/>
    }

    return <TrackList tracks={searchResults} playlistId={id!} onDelete={deleteTrackFromPlaylist}/>
  }

  const isThePlaylistCustom = (): boolean => {
    return playlist.id !== favoritesId;
  }

  const runPlayllist = (): void => {
    dispatch(setPlaybackQueue(playlist.tracks));
    dispatch(setCurrentTrackIndex(0));
  }

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const newTitle = e.currentTarget.value;

    setTitle(newTitle);
  }

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
  }

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') {
      return;
    }

    e.currentTarget.blur();
  }

  const removePlaylist = () => {
    dispatch(removePlaylistById(id!));
    navigate('/playlists');
  }

  return (
    <section className={`${styles.playlist} _page`}>
      <div className={`playlist__inner _container`}>
      <header className={styles.playlist__header}>
        <div className={styles.playlist__coverWrapper}>
          <img className={styles.playlist__coverImg} src={`/images/covers/${playlist.coverUrl}`} alt={`${playlist.title} cover`} />
        </div>
        <div className={styles.playlist__infoWrapper}>
          <div className={styles.playlist__info}>
            <p className={styles.playlist__itemLabel}>Playlist</p>
            {
              isThePlaylistCustom() ?
              <EditTitleInput
                title={title}
                onChange={handleInputChange}
                onBlur={editPlaylistTitle}
                onKeyDown={handleEnterKeyDown}
              /> :
              <h1 className={`${styles.playlist__title} _pageTitle`}>{playlist.title}</h1>
            }
            <p className={styles.playlist__user}>{playlist.user}</p>
            <p className={`${styles.playlist__dateOfCreation} ${styles._date}`}>{`Created: ${getDateOfCreation()}`}</p>
            <p className={`${styles.playlist__dateOfUpdate} ${styles._date}`}>{`Last update: ${getUpdateTime(playlist.dateOfUpdate)}`}</p>
            <p className={styles.playlist__tracksAmount}>{getTracksAmount(playlist)}</p>
          </div>
          <div className={styles.playlist__controls}>
            <IconButton
              isDisabled={playlist.tracks.length === 0}
              iconId={iconIds.play}
              height='2em'
              width='2em'
              className={`${styles.playlist__playButton} _playButton`}
              onClick={runPlayllist}
            />
            <IconButton
              iconId={iconIds.playbackQueue}
              isDisabled={playlist.tracks.length === 0}
              height='2em'
              width='2em'
              fill={playlist.tracks.length === 0 ? '#565656' : '#E5E5E5'}
              className={styles.playlist__addToPlayback}
              onClick={(e) => console.log(e.target)}
            />
            {
              isThePlaylistCustom() && <IconButton
                iconId={iconIds.delete}
                height='1.5em'
                width='1.5em'
                fill='#E5E5E5'
                className={styles.playlist__delete}
                onClick={openModal}
              />
            }
          </div>
        </div>
      </header>
      <SearchBar onInput={searchTrack}/>
      {
        playlist.tracks.length > 0 ?
          displaySearchResults() :
          <EmptyMessage
            title={'The playlist is empty'}
            message={'Add some tracks to the playlist!'}/>
      }
      </div>
      <AlertModal
        isOpen={isOpen}
        closeModal={closeModal}
        onCancel={closeModal}
        onConfirm={removePlaylist}
        text={'Are you sure you want to delete the playlist? This action cannot be undone.'}
        confirmText={'Yes'}
        cancelText={'No'}
      />
    </section>
  )
}