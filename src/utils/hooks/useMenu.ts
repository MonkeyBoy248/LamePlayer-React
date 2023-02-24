import { useCallback, useState } from 'react';

interface UseMenu<T> {
  anchorElement: T | null;
  showMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  isMenuOpen: boolean;
  setAnchor: (element: T) => void;
}

export const useMenu = <T extends HTMLElement>(): UseMenu<T> => {
  const [anchorElement, setAnchorElement] = useState<T | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const setAnchor = useCallback((element: T) => setAnchorElement(element), []);
  const showMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((currentValue) => !currentValue);
  }, []);

  return { anchorElement, showMenu, closeMenu, toggleMenu, isMenuOpen, setAnchor };
};
