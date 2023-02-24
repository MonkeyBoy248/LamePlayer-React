import { useState, useCallback } from 'react';

interface UsePopUp {
  isPopUpOpen: boolean;
  showPopUp: () => void;
  closePopUp: () => void;
}

export const usePopUp = (): UsePopUp => {
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

  const showPopUp = useCallback(() => setIsPopUpOpen(true), []);
  const closePopUp = useCallback(() => setIsPopUpOpen(false), []);

  return { isPopUpOpen, showPopUp, closePopUp };
};
