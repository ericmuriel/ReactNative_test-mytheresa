import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilmDetail from './FilmDetail';
import { GenericContext } from '../../context/GenericContext';
import { ThemeContext, lightTheme } from '../../constants/ThemeContext';
import { GenericContextValue, Movie } from '../../context/type';

const mockFilm: Movie = {
    id: 1,
    title: 'Test Movie',
    overview: 'This is a test movie overview that is longer than 100 characters to test the read more functionality.',
    poster_path: '/testpath.jpg',
    genre_ids: [28],
    release_date: '2024-01-01',
    vote_average: 8.5,
    vote_count: 200,
    adult: false,
    backdrop_path: '/backdrop.jpg',
    original_language: 'en',
    original_title: 'Test Movie Original Title',
    popularity: 10.0,
    video: false,
  };

const mockAddToWishlist = jest.fn();
const mockRemoveFromWishlist = jest.fn();
const mockSetData = jest.fn();
const mockSetIsLoading = jest.fn();
const mockSetMovies = jest.fn();

const mockContextValue: GenericContextValue = {
  data: [],
  setData: mockSetData,
  loading: false,
  setIsLoading: mockSetIsLoading,
  movies: [],
  setMovies: mockSetMovies,
  wishlist: [],
  addToWishlist: mockAddToWishlist,
  removeFromWishlist: mockRemoveFromWishlist,
};

const renderComponent = () => {
  return render(
    <ThemeContext.Provider value={lightTheme}>
      <GenericContext.Provider value={mockContextValue}>
        <FilmDetail route={{ params: { film: mockFilm } }} />
      </GenericContext.Provider>
    </ThemeContext.Provider>
  );
};

describe('FilmDetail', () => {
  it('renders the film details correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText('Test Movie')).toBeTruthy();
    expect(getByText('This is a test movie overview that is longer than 100 characters to test the read more functionality.')).toBeTruthy();
    expect(getByText('Release Date: 2024-01-01')).toBeTruthy();
    expect(getByText('Vote Average: 8.5')).toBeTruthy();
    expect(getByText('Vote Count: 200')).toBeTruthy();
  });

  it('displays "Add to Wishlist" button if film is not in wishlist', () => {
    const { getByText } = renderComponent();

    expect(getByText('Add to Wishlist')).toBeTruthy();
  });

  it('calls addToWishlist when "Add to Wishlist" button is pressed', () => {
    const { getByText } = renderComponent();
    const button = getByText('Add to Wishlist');

    fireEvent.press(button);
    expect(mockAddToWishlist).toHaveBeenCalledWith(mockFilm);
  });
  });
