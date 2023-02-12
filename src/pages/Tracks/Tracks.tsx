import TrackList from "@features/Tracks/components/TrackList/TrackList";
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { removeTrack } from '@/features/Tracks/tracksSlice';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { filterArrayByKeys } from '@/utils/helpers/filterArrayByKeys';
import { useState, useMemo } from 'react';
import { EmptyMessage } from '@/components/EmptyMessage/EmptyMessage';

interface TracksProps {
  title: string;
}

const Tracks = ({ title }: TracksProps ) => {
  const dispatch: AppDispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.tracks.tracklist);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchResults = useMemo(() => {
    if (!searchTerm) {
      return tracks;
    }

    return filterArrayByKeys(tracks, ['artist', 'title'], searchTerm);
  }, [searchTerm, tracks]);

  const deleteTrackFromTracklist = (trackId: string) => {
    dispatch(removeTrack(trackId));
  }

  const searchTrack = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchTerm(e.currentTarget.value);
  }

  const displaySearchResults = (): JSX.Element => {
    if (searchResults.length === 0) {
      return <EmptyMessage title={'Nothing found'}/>
    }

    return <TrackList tracks={searchResults} onDelete={deleteTrackFromTracklist}/>
  }

  return (
    <section className={`tracks _page`}>
      <div className={`tracks__inner _container`}>
        <h2 className={`tracks__pageTitle _pageTitle`}>{title}</h2>
        <SearchBar onInput={searchTrack}/>
        {
          tracks.length > 0 ?
            displaySearchResults() :
            <EmptyMessage
              title={'The tracklist is empty'}
            />
        }
      </div>
    </section>
  )
}

export default Tracks;