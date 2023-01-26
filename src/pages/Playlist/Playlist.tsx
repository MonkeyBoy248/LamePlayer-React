import { RootState } from '@/app/store'
import { IconButton } from '@/components/IconButton'
import { getTracksAmount } from '@/features/Playlists/helpers/getTracksAmount'
import { getUpdateTime } from '@/features/Playlists/helpers/getUpdateTime'
import { selectPlaylistById } from '@/features/Playlists/selectors'
import TrackList from '@/features/Tracks/components/TrackList/TrackList'
import { iconIds } from '@/utils/config/iconIds'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from './Playlist.module.scss'

export const Playlist = () => {
  const { id } = useParams();
  const playlist = useSelector((state: RootState) => selectPlaylistById(state, id!));

  const getDateOfCreation = (): string => {
    return new Date(playlist.dateOfCreation).toLocaleDateString();
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
              iconId={iconIds.play}
              height='2em'
              width='2em'
              className={`${styles.playlist__playButton} _playButton`}
              onClick={(e) => console.log(e.target)}
            />
            <IconButton
              iconId={iconIds.dots}
              height='2em'
              width='2em'
              fill='#E5E5E5'
              className={styles.playlist__optionsn}
              onClick={(e) => console.log(e.target)}
            />
          </div>
        </div>
      </header>
      <input type="text" />
      <TrackList tracks={playlist.tracks}/>
      </div>
    </section>
  )
}