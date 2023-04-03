import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, vi } from 'vitest';
import { SearchBar } from './SearchBar';


describe('SearchBar component', () => {
  const onChangeMock = vi.fn();

  it('should render the component with the default placeholder', () => {
    render(<SearchBar onChange={onChangeMock} />);

    const inputElement = screen.getByPlaceholderText(/Search track/i);

    expect(inputElement).toBeInTheDocument();
  });

  it('should render the component with the given placeholder', () => {
    render(<SearchBar onChange={onChangeMock} placeholder={'Test placeholder'} />);

    const inputElement = screen.getByPlaceholderText(/Test placeholder/i);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toMatchSnapshot();
  });

  it('should fire the onChange event', async () => {
    render(<SearchBar onChange={onChangeMock} />);

    const inputElement = screen.getByPlaceholderText(/Search track/i);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toMatchSnapshot();
    await userEvent.type(screen.getByPlaceholderText(/Search track/i), 'Test');

    expect(onChangeMock).toHaveBeenCalledTimes(4);
    expect(inputElement).toHaveValue('Test');
  });
});
