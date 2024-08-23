// FilmList.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilmList from './FilmList';
import { GenericContext } from '@/context/GenericContext';
import { Movie } from '../../context/type';

const mockData: Movie[] = [
  {
    id: 1,
    title: 'Film 1',
    poster_path: '/path1.jpg',
    genre_ids: [80],
    adult: false,
    backdrop_path: '/backdrop1.jpg',
    original_language: 'en',
    original_title: 'Original Title 1',
    overview: 'Overview for Film 1',
    popularity: 10,
    release_date: '2023-01-01',
    vote_average: 8.5,
    vote_count: 100,
    video: false
  },
  {
    id: 2,
    title: 'Film 2',
    poster_path: '/path2.jpg',
    genre_ids: [35],
    adult: false,
    backdrop_path: '/backdrop2.jpg',
    original_language: 'en',
    original_title: 'Original Title 2',
    overview: 'Overview for Film 2',
    popularity: 15,
    release_date: '2023-02-01',
    vote_average: 7.5,
    vote_count: 200,
    video: false
  },
  {
    id: 3,
    title: 'Film 3',
    poster_path: '/path3.jpg',
    genre_ids: [10752],
    adult: false,
    backdrop_path: '/backdrop3.jpg',
    original_language: 'en',
    original_title: 'Original Title 3',
    overview: 'Overview for Film 3',
    popularity: 20,
    release_date: '2023-03-01',
    vote_average: 9.0,
    vote_count: 300,
    video: false
  },
];

jest.mock('../../constants/ThemeContext', () => ({
  useTheme: () => ({
    styles: {
      container: {},
      title: {},
    },
  }),
}));

describe('FilmList', () => {
  it('should render film list sections and items', () => {
    const navigation = { navigate: jest.fn() };

    const { getByText } = render(
      <GenericContext.Provider value={{ 
        data: mockData, 
        setData: jest.fn(),
        loading: false,
        setIsLoading: jest.fn(),
        movies: [],
        setMovies: jest.fn(),
        wishlist: [],
        addToWishlist: jest.fn(),
        removeFromWishlist: jest.fn()
      }}>
        <FilmList navigation={navigation} />
      </GenericContext.Provider>
    );

    expect(getByText('Crime')).toBeTruthy();
    expect(getByText('Comedy')).toBeTruthy();
    expect(getByText('War')).toBeTruthy();

    expect(getByText('Film 1')).toBeTruthy();
    expect(getByText('Film 2')).toBeTruthy();
    expect(getByText('Film 3')).toBeTruthy();
  });

  it('should navigate to details screen on film item press', () => {
    const navigation = { navigate: jest.fn() };

    const { getByTestId } = render(
      <GenericContext.Provider value={{ 
        data: mockData, 
        setData: jest.fn(),
        loading: false,
        setIsLoading: jest.fn(),
        movies: [],
        setMovies: jest.fn(),
        wishlist: [],
        addToWishlist: jest.fn(),
        removeFromWishlist: jest.fn()
      }}>
        <FilmList navigation={navigation} />
      </GenericContext.Provider>
    );

    const filmItem = getByTestId('film-item-1');
    fireEvent.press(filmItem);

    expect(navigation.navigate).toHaveBeenCalledWith('Details', { film: mockData[0] });
  });
});
