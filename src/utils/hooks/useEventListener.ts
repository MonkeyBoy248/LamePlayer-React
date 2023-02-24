import { RefObject, useCallback, useEffect, useRef } from 'react';

export const useEventListener = (
  element: Element | RefObject<Element> | Document | Window = window,
  type: keyof WindowEventMap,
  listener: EventListener
): void => {
  const savedListener = useRef<EventListener>();

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  const handleEventListener = useCallback((event: Event) => {
    savedListener.current?.(event);
  }, []);

  useEffect(() => {
    if (!element && !element['addEventListener']) {
      return;
    }

    const target = 'current' in element ? element.current : element;
    target?.addEventListener(type, handleEventListener);

    return () => target?.removeEventListener(type, handleEventListener);
  }, [type, element, handleEventListener]);
};
