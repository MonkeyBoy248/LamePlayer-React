import { afterEach, describe, it, vi, expect } from 'vitest';
import { getItemFromLocalStorage, setItemToLocalStorage } from './localStorage';

const MOCK_KEY = 'mock';

describe('local storage helper', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  afterEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  });

  describe('getItemFromLocalStorage', () => {
    it('should return null if the key does not exist', () => {
      expect(getItemFromLocalStorage(MOCK_KEY)).null;
      expect(getItemSpy).toHaveBeenCalledWith(MOCK_KEY);
    });

    it('should return track object from local storage', () => {
      const track = {
        title: 'The Outsider',
        artist: 'A Perfect Circle',
        album: 'Thirteenth Step',
        coverUrl: 'thirteenth-step.jpg',
        src: 'A Perfect Circle - The Outsider.mp3',
      };

      localStorage.setItem(MOCK_KEY, JSON.stringify(track));

      expect(getItemFromLocalStorage(MOCK_KEY)).toStrictEqual(track);
      expect(getItemSpy).toHaveBeenCalledWith(MOCK_KEY);
    });
  });

  describe('setItemToLocalStorage', () => {
    it('should add track to local storage', () => {
      const track = {
        title: 'The Outsider',
        artist: 'A Perfect Circle',
        album: 'Thirteenth Step',
        coverUrl: 'thirteenth-step.jpg',
        src: 'A Perfect Circle - The Outsider.mp3',
      };

      setItemToLocalStorage(MOCK_KEY, track);

      expect(setItemSpy).toHaveBeenCalledWith(MOCK_KEY, JSON.stringify(track));
      expect(getItemFromLocalStorage(MOCK_KEY)).toStrictEqual(track);
    });
  });
});
