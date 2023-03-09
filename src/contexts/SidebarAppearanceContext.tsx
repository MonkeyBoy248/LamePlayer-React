import { createContext, useContext, useReducer } from 'react';

interface SidebarAppearanceProviderProps {
  children: React.ReactNode;
}

interface SidebarState {
  isOpen: boolean;
}

export enum SidebarActionKind {
  TOGGLE = 'TOGGLE',
}

interface SidebarAction {
  type: SidebarActionKind;
}

export const SidebarAppearanceContext = createContext<SidebarState | null>(null);
export const SidebarAppearanceDispatchContext = createContext<null | React.Dispatch<SidebarAction>>(null);

export const useSidebarAppearance = (): SidebarState => {
  return useContext(SidebarAppearanceContext) as SidebarState;
};

export const useSidebarAppearanceDispatch = (): React.Dispatch<SidebarAction> => {
  return useContext(SidebarAppearanceDispatchContext) as React.Dispatch<SidebarAction>;
};

const inittialState: SidebarState = { isOpen: true };

const sidebarAppearanceReducer = (state: SidebarState, action: SidebarAction): SidebarState => {
  switch (action.type) {
    case SidebarActionKind.TOGGLE: {
      return { isOpen: !state.isOpen };
    }
  }
};

export const SidebarAppearanceProvider = ({ children }: SidebarAppearanceProviderProps): JSX.Element => {
  const [isOpen, dispatch] = useReducer(sidebarAppearanceReducer, inittialState);

  return (
    <SidebarAppearanceContext.Provider value={isOpen}>
      <SidebarAppearanceDispatchContext.Provider value={dispatch}>{children}</SidebarAppearanceDispatchContext.Provider>
    </SidebarAppearanceContext.Provider>
  );
};
