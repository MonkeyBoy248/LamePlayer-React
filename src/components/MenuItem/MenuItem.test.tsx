import { iconIds } from '@/utils/config/iconIds';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, vi } from 'vitest';
import { MenuItem } from './MenuItem';

describe('MenuItem component', () => {
  const onClickMock = vi.fn();
  const iconId = iconIds.add;
  const title = 'Test title';

  it('should render menu item', () => {
    render(<MenuItem iconId={iconId} title={title} onClick={onClickMock} />);

    const titleElement = screen.getByText(/Test title/i);
    const menuItemElement = screen.getByTestId('menuItem');

    expect(titleElement).toBeInTheDocument();
    expect(menuItemElement).toMatchSnapshot();
  });

  it('should fire a click event', async () => {
    render(<MenuItem iconId={iconId} title={title} onClick={onClickMock} />);

    const menuItemElement = screen.getByTestId('menuItem');

    expect(menuItemElement).toBeInTheDocument();
    await userEvent.click(menuItemElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
