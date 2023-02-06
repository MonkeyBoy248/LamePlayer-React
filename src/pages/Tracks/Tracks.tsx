import styles from './Tracks.module.scss';
import TrackList from "@features/Tracks/components/TrackList/TrackList";
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { removeTrack } from '@/features/Tracks/tracksSlice';

interface TracksProps {
  title: string;
}

const Tracks = ({ title }: TracksProps ) => {
  const dispatch: AppDispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.tracks.tracklist);

  const deleteTrackFromTracklist = (trackId: string) => {
    dispatch(removeTrack(trackId));
  }

  return (
    <section className={`${styles.tracks} _page`}>
      <div className={`${styles.tracks__inner} _container`}>
        <h2 className={`${styles.tracks__pageTitle} _pageTitle`}>{title}</h2>
        <TrackList onDelete={deleteTrackFromTracklist} tracks={tracks}/>
      </div>
    </section>
  )
}

export default Tracks;