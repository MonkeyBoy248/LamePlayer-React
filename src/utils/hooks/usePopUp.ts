import { useState, useCallback } from 'react';

export const usePopUp = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showPopUp = useCallback(() => setIsOpen(true), []);
  const closePopUp = useCallback(() => setIsOpen(false), []);
  const togglePopUpVisibility = useCallback(() => {
    setIsOpen(currentValue => !currentValue);
  }, [])

  return { isOpen, showPopUp, closePopUp, togglePopUpVisibility }
}