import { describe, expect, it } from 'vitest';
import { formatTime } from './formatTime';

describe('formatTime', () => {
  it(' should format time in seconds when minutes < 10', () => {
    expect(formatTime(180)).toBe('03:00');
  });

  it('should format time in seconds when minutes > 10', () => {
    expect(formatTime(660)).toBe('11:00');
  });

  it('should format time in seconds when seconds < 10', () => {
    expect(formatTime(182)).toBe('03:02');
  });

  it('should format time in seconds when seconds > 10', () => {
    expect(formatTime(191)).toBe('03:11');
  });
});
