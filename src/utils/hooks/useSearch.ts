import { TrackModel } from '@/interfaces/Track';
import { useCallback, useMemo, useState } from 'react';
import { filterArrayByKeys } from '../helpers/filterArrayByKeys';

export const useSearchTrack = (tracks: TrackModel[]) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchResults = useMemo(() => {
    if (!searchTerm) {
      return tracks;
    }

    return filterArrayByKeys(tracks, ['artist', 'title'], searchTerm);
  }, [searchTerm, tracks]);

  const searchTrack = useCallback((e: React.FormEvent<HTMLInputElement>): void => {
    setSearchTerm(e.currentTarget.value);
  }, []);

  return { searchResults, searchTrack }
}