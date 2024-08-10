import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { GenericContext } from '@/context/GenericContext';
import {   
  CloseButton,
  Container,
  EmptyText,
  FilmImage,
  FilmItem,
  StyledText,
  TextContainer
} from './WishListStyled';


const WishlistScreen: React.FC = () => {
  const { wishlist, removeFromWishlist } = useContext(GenericContext);

  return (
    <Container>
      {wishlist.length === 0 ? (
        <EmptyText>Your wishlist is empty.</EmptyText>
      ) : (
        wishlist.map((film: any) => (
          <FilmItem key={film.id}>
            <FilmImage
              source={{ uri: `https://image.tmdb.org/t/p/w500${film.poster_path}` }}
            />
            <TextContainer>
              <StyledText>{film.title}</StyledText>
              <CloseButton onPress={() => removeFromWishlist(film.id)}>
                <Ionicons name="close" size={24} color="red" />
              </CloseButton>
            </TextContainer>
          </FilmItem>
        ))
      )}
    </Container>
  );
};

export default WishlistScreen;
