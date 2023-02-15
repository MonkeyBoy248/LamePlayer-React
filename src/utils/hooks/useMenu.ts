import { useCallback, useRef, useState } from 'react'

export const useMenu = <T extends HTMLElement>() => {
  const [anchorElement, setAnchorElement] = useState<T | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const setAnchor = useCallback((element: T) => setAnchorElement(element), [])
  const showMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(currentValue => !currentValue);
  }, []);

  return { anchorElement, showMenu, closeMenu, toggleMenu, isMenuOpen, setAnchor }

}