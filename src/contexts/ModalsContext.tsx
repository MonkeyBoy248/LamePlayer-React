import { createContext, useCallback, useContext, useState } from 'react';

interface ModalsProviderProps {
  children: React.ReactNode;
}

interface ModalsProviderValue {
  openModal: (modalComponent: React.ReactNode) => void;
  closeModal: () => void;
}

export const ModalsContext = createContext<ModalsProviderValue>({} as ModalsProviderValue);
export const useModals = (): ModalsProviderValue => useContext(ModalsContext);

export const ModalsProvider = ({ children }: ModalsProviderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<React.ReactNode | null>(null);

  const openModal = useCallback((modalComponent: React.ReactNode) => {
    setCurrentModal(modalComponent);
    setIsOpen(true);
    document.body.classList.add('_scroll-lock');
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setCurrentModal(null);
    document.body.classList.remove('_scroll-lock');
  }, []);

  return (
    <ModalsContext.Provider value={{ openModal, closeModal }}>
      {isOpen && currentModal}
      {children}
    </ModalsContext.Provider>
  );
};
