import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilmDetailModal from './ModalFilmDetail';
import { ColorValue } from 'react-native';

const mockFilm = {
  title: 'Test Movie Title',
  overview: 'This is a test movie overview. It is long enough to require scrolling in the modal view.',
};

const mockTheme = {
  styles: {
    button: {
      backgroundColor: '#6200ea' as ColorValue,
    },
  },
};

const genreTests = [
  {
    genre: 'Crime',
    genreStyle: {
      fontFamily: 'Crime',
      buttonColor: "#FF4500",
    },
  },
  {
    genre: 'Comedy',
    genreStyle: {
      fontFamily: 'Comedy',
      buttonColor: "#32CD32",
    },
  },
  {
    genre: 'War',
    genreStyle: {
      fontFamily: 'serif',
      buttonColor: "#8B0000",
    },
  },
];


  it('renders correctly when visible', () => {
    const { getByTestId } = render(
      <FilmDetailModal
        visible={true}
        onClose={() => {}}
        film={mockFilm}
        genreStyle={genreTests[0].genreStyle} 
        theme={mockTheme}
      />
    );

    expect(getByTestId('title-text')).toBeTruthy();
    expect(getByTestId('overview-text')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByTestId } = render(
      <FilmDetailModal
        visible={false}
        onClose={() => {}}
        film={mockFilm}
        genreStyle={genreTests[0].genreStyle}
        theme={mockTheme}
      />
    );

    expect(queryByTestId('title-text')).toBeNull();
    expect(queryByTestId('overview-text')).toBeNull();
  });

  it('calls onClose when the close button is pressed', () => {
    const mockOnClose = jest.fn();

    const { getByTestId } = render(
      <FilmDetailModal
        visible={true}
        onClose={mockOnClose}
        film={mockFilm}
        genreStyle={genreTests[0].genreStyle}
        theme={mockTheme}
      />
    );

    fireEvent.press(getByTestId('close-button'));

    expect(mockOnClose).toHaveBeenCalled();
  });
