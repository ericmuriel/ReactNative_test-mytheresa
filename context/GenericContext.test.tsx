import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import GenericContextProvider, { GenericContext } from './GenericContext';
import { Button, Text, View } from 'react-native';

const TestComponent = () => {
  const context = React.useContext(GenericContext);
  
  if (!context) {
    throw new Error('Context not found');
  }

  const { addToWishlist, removeFromWishlist, wishlist, setData, data } = context;

  return (
    <View>
      <Button
        testID="add-to-wishlist"
        title="Add to Wishlist"
        onPress={() => addToWishlist({ id: 1, title: 'Test Movie', adult: false, backdrop_path: '', genre_ids: [], original_language: '', original_title: '', overview: '', popularity: 0, poster_path: '', release_date: '', video: false, vote_average: 0, vote_count: 0 })}
      />
      <Button
        testID="remove-from-wishlist"
        title="Remove from Wishlist"
        onPress={() => removeFromWishlist(1)}
      />
      <Button
        testID="set-data"
        title="Set Data"
        onPress={() => setData([{ id: 1, title: 'Test Movie', adult: false, backdrop_path: '', genre_ids: [], original_language: '', original_title: '', overview: '', popularity: 0, poster_path: '', release_date: '', video: false, vote_average: 0, vote_count: 0 }])}
      />
      <Text testID="wishlist-count">Wishlist Count: {wishlist.length}</Text>
      <Text testID="data-count">Data Count: {data.length}</Text>
    </View>
  );
};

describe('GenericContextProvider', () => {
  it('should provide context values and functions correctly', () => {
    const { getByTestId } = render(
      <GenericContextProvider>
        <TestComponent />
      </GenericContextProvider>
    );

    act(() => {
      fireEvent.press(getByTestId('add-to-wishlist'));
    });

    const wishlistCountText = getByTestId('wishlist-count').props.children.join('');
    expect(wishlistCountText).toBe('Wishlist Count: 1');

    act(() => {
      fireEvent.press(getByTestId('set-data'));
    });

    const dataCountText = getByTestId('data-count').props.children.join('');
    expect(dataCountText).toBe('Data Count: 1');

    act(() => {
      fireEvent.press(getByTestId('remove-from-wishlist'));
    });

    const updatedWishlistCountText = getByTestId('wishlist-count').props.children.join('');
    expect(updatedWishlistCountText).toBe('Wishlist Count: 0');
  });
});
