import { useState, useCallback, useEffect } from 'react';

export const usePopUp = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

  const showPopUp = useCallback(() => setIsPopUpOpen(true), []);
  const closePopUp = useCallback(() => setIsPopUpOpen(false), []);

  return { isPopUpOpen, showPopUp, closePopUp }
}