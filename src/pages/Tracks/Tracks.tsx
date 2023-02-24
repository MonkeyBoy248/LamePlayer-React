import TrackList from '@features/Tracks/components/TrackList/TrackList';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { removeTrack } from '@/features/Tracks/tracksSlice';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { EmptyMessage } from '@/components/EmptyMessage/EmptyMessage';
import { useSearchTrack } from '@/utils/hooks/useSearch';
import { FC } from 'react';
import { Page } from '@/interfaces/Page';

const Tracks: FC<Page> = ({ title }: Page): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.tracks.tracklist);
  const { searchResults, searchTrack } = useSearchTrack(tracks);

  const deleteTrackFromTracklist = (trackId: string): void => {
    dispatch(removeTrack(trackId));
  };

  const displaySearchResults = (): JSX.Element => {
    if (searchResults.length === 0) {
      return <EmptyMessage title={'Nothing found'} />;
    }

    return <TrackList tracks={searchResults} onDelete={deleteTrackFromTracklist} />;
  };

  return (
    <section className={`tracks _page`}>
      <div className={`tracks__inner _container`}>
        <h2 className={`tracks__pageTitle _pageTitle`}>{title}</h2>
        <SearchBar onInput={searchTrack} />
        {tracks.length > 0 ? displaySearchResults() : <EmptyMessage title={'The tracklist is empty'} />}
      </div>
    </section>
  );
};

export default Tracks;
