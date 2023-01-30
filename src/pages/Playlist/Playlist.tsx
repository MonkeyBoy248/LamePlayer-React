import { AppDispatch, RootState } from '@/app/store'
import { EmptyMessage } from '@/components/EmptyMessage/EmptyMessage'
import { IconButton } from '@/components/IconButton'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { getTracksAmount } from '@/features/Playlists/helpers/getTracksAmount'
import { getUpdateTime } from '@/features/Playlists/helpers/getUpdateTime'
import { selectPlaylistById } from '@/features/Playlists/selectors'
import TrackList from '@/features/Tracks/components/TrackList/TrackList'
import { setCurrentTrackIndex, setPlaybackQueue } from '@/features/Tracks/tracksSlice'
import { iconIds } from '@/utils/config/iconIds'
import { filterArrayByKeys } from '@/utils/helpers/filterArrayByKeys'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from './Playlist.module.scss'

export const Playlist = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const playlist = useSelector((state: RootState) => selectPlaylistById(state, id!));
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchResults = useMemo(() => {
    if (!searchTerm) {
      return playlist.tracks;
    }

    return filterArrayByKeys(playlist.tracks, ['artist', 'title'], searchTerm);
  }, [searchTerm, playlist.tracks])

  const getDateOfCreation = (): string => {
    return new Date(playlist.dateOfCreation).toLocaleDateString();
  }

  const searchTrack = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  }

  const displaySearchResults = () => {
    if (searchResults.length === 0) {
      return <EmptyMessage title={'Nothing found'}/>
    }

    return <TrackList tracks={searchResults}/>
  }

  const runPlayllist = () => {
    dispatch(setPlaybackQueue(playlist.tracks));
    dispatch(setCurrentTrackIndex(0));
  }

  return (
    <section className={`${styles.playlist} _page`}>
      <div className={`playlist__inner _container`}>
      <header className={styles.playlist__header}>
        <div className={styles.playlist__coverWrapper}>
          <img className={styles.playlist__coverImg} src={`/images/covers/${playlist.coverUrl}`} alt={`${playlist.name} cover`} />
        </div>
        <div className={styles.playlist__infoWrapper}>
          <div className={styles.playlist__info}>
            <p className={styles.playlist__itemLabel}>Playlist</p>
            <h2 className={`${styles.playlist__title} _pageTitle`}>{playlist.name}</h2>
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
            <IconButton
              iconId={iconIds.delete}
              height='1.5em'
              width='1.5em'
              fill='#E5E5E5'
              className={styles.playlist__delete}
              onClick={(e) => console.log(e.target)}
            />
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
    </section>
  )
}