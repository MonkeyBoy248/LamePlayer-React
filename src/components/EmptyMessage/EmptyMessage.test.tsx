import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EmptyMessage } from './EmptyMessage';

describe('EmptyMessage component', () => {
  it('should render the component with the title and the message', () => {
    const [title, message] = ['Test title', 'Test message'];

    render(<EmptyMessage title={title} message={message} />);

    const titleElement = screen.getByText(title);
    const messageElement = screen.getByText(message);

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(titleElement).toMatchSnapshot();
  });

  it('should render the component with the title only', () => {
    const title = 'Test title';

    render(<EmptyMessage title={title} />);

    const titleElement = screen.getByText(title);
    const messageElement = screen.queryByTestId('emptyMessage');

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeNull();
  });

  it('should render the component with the title only if the message is empty string', () => {
    const [title, message] = ['Test title', ''];

    render(<EmptyMessage title={title} message={message} />);

    const titleElement = screen.getByText(title);
    const messageElement = screen.queryByTestId('emptyMessage');

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeNull();
  });

  it('should render the component with the title fallback', () => {
    const [title, message] = ['', 'Test message'];

    render(<EmptyMessage title={title} message={message} />);

    const titleElement = screen.getByTestId('emptyTitle');
    const messageElement = screen.getByTestId('emptyMessage');

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(/Nothing found/i);
    expect(messageElement).toHaveTextContent(message);
  });
});
