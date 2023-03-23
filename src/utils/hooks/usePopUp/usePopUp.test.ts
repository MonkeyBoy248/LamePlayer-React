import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePopUp } from './usePopUp';

describe('usePopUp', () => {
  it('should render the hook with the initial state', () => {
    const { result } = renderHook(usePopUp);

    expect(result.current.isPopUpOpen).toBe(false);
  });

  it('should change the state value to true', () => {
    const { result } = renderHook(usePopUp);

    act(() => {
      result.current.showPopUp();
    });

    expect(result.current.isPopUpOpen).toBe(true);
  });

  it('should change the state value to false', () => {
    const { result } = renderHook(usePopUp);

    act(() => {
      result.current.showPopUp();
    });

    act(() => {
      result.current.closePopUp();
    });

    expect(result.current.isPopUpOpen).toBe(false);
  });
});
