// WishList.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GenericContextValue } from '../../context/type';
import WishlistScreen from './WishList';
import { GenericContext } from '../../context/GenericContext';

const mockRemoveFromWishlist = jest.fn();
const mockAddToWishlist = jest.fn();
const mockSetData = jest.fn();
const mockSetMovies = jest.fn();
const mockSetIsLoading = jest.fn();

const MockGenericContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const mockContextValue: GenericContextValue = {
    data: [],
    setData: mockSetData,
    loading: false,
    setIsLoading: mockSetIsLoading,
    movies: [],
    setMovies: mockSetMovies,
    wishlist: [
      {
        id: 1,
        title: 'Test Movie',
        adult: false,
        backdrop_path: '/test.jpg',
        genre_ids: [],
        original_language: 'en',
        original_title: 'Test Movie',
        overview: 'A test movie',
        popularity: 10,
        poster_path: '/test.jpg',
        release_date: '2024-01-01',
        video: false,
        vote_average: 7,
        vote_count: 100
      }
    ],
    addToWishlist: mockAddToWishlist,
    removeFromWishlist: mockRemoveFromWishlist,
  };

  return (
    <GenericContext.Provider value={mockContextValue}>
      {children}
    </GenericContext.Provider>
  );
};

describe('WishlistScreen', () => {
  it('should display "Your wishlist is empty." when wishlist is empty', () => {
    const { getByText } = render(
      <GenericContext.Provider value={{ 
        data: [], 
        setData: jest.fn(),
        loading: false,
        setIsLoading: jest.fn(),
        movies: [],
        setMovies: jest.fn(),
        wishlist: [], 
        addToWishlist: jest.fn(), 
        removeFromWishlist: jest.fn() 
      }}>
        <WishlistScreen />
      </GenericContext.Provider>
    );

    expect(getByText('Your wishlist is empty.')).toBeTruthy();
  });

  it('should display wishlist items and handle remove from wishlist', () => {
    const { getByText, getByTestId } = render(
      <MockGenericContextProvider>
        <WishlistScreen />
      </MockGenericContextProvider>
    );
    expect(getByText('Test Movie')).toBeTruthy();

    const closeButton = getByTestId('close-button');
    expect(closeButton).toBeTruthy();

    fireEvent.press(closeButton);


    expect(mockRemoveFromWishlist).toHaveBeenCalledWith(1);
  });
});
