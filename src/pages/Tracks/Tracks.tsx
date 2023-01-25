import styles from './Tracks.module.scss';
import TrackList from "@features/Tracks/components/TrackList/TrackList";
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

interface TracksProps {
  title: string;
}

const Tracks = ({ title }: TracksProps ) => {
  const tracks = useSelector((state: RootState) => state.tracks.tracklist);

  return (
    <section className={styles.tracks}>
      <div className={`${styles.tracks__inner} _container`}>
        <h2 className={`${styles.tracks__pageTitle} _pageTitle`}>{title}</h2>
        <TrackList tracks={tracks}/>
      </div>
    </section>
  )
}

export default Tracks;