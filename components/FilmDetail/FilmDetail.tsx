import React, { useContext, useState } from 'react';
import { View, Text, Button, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { genreMap } from '../../utils/GenreMap';
import { genreStyles } from '../../utils/GenreStyles';
import { GenericContext } from '../../context/GenericContext';
import {
  Header,
  ContentContainer,
  ImageArea,
  DescriptionArea,
  FilmImage,
  AdditionalInfo,
  ReadMore,
  ModalContainer,
  ModalContent,
  ButtonContainer,
  Text as StyledText
} from './FilmDetailStyled';
import { useTheme } from '@/constants/ThemeContext';

const FilmDetail = ({ route }: any) => {
  const { film } = route.params;
  const { wishlist, addToWishlist } = useContext(GenericContext);
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const isFilmInWishlist = wishlist.some(item => item.id === film.id);

  const truncatedText = film.overview.length > 250 ? `${film.overview.substring(0, 250)}...` : film.overview;

  const getGenreStyle = (genreIds: number[]) => {
    for (let id of genreIds) {
      const genreName = genreMap[id];
      if (genreStyles[genreName]) {
        return genreStyles[genreName];
      }
    }
    return {};
  };

  const genreStyle = getGenreStyle(film.genre_ids);

  return (
    <View style={{ flex: 1, backgroundColor: genreStyle.backgroundColor || 'white' }}>
      <ScrollView contentContainerStyle={theme.styles.container}>
        <Header>
          <StyledText style={{ fontFamily: genreStyle.fontFamily || 'default', fontSize: 24, fontWeight: 'bold' }}>
            {film.title}
          </StyledText>
        </Header>

        <ContentContainer>
          <ImageArea>
            <FilmImage source={{ uri: `https://image.tmdb.org/t/p/w500${film.poster_path}` }} />
          </ImageArea>
          <DescriptionArea>
            <StyledText style={{ fontFamily: genreStyle.fontFamily || 'default', fontSize: 16 }}>
              {truncatedText}
            </StyledText>
            {film.overview.length > 100 && (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <ReadMore>Read more</ReadMore>
              </TouchableOpacity>
            )}
            <ButtonContainer>
              <Button
                title={isFilmInWishlist ? "In Wishlist" : "Add to Wishlist"}
                color={genreStyle.buttonColor || theme.styles.button.backgroundColor}
                onPress={() => {
                  if (!isFilmInWishlist) {
                    addToWishlist(film);
                  }
                }}
                disabled={isFilmInWishlist}
              />
            </ButtonContainer>
          </DescriptionArea>
        </ContentContainer>

        <AdditionalInfo>
          <StyledText>Additional information:</StyledText>
          <StyledText>Release Date: {film.release_date}</StyledText>
          <StyledText>Vote Average: {film.vote_average}</StyledText>
          <StyledText>Vote Count: {film.vote_count}</StyledText>
        </AdditionalInfo>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ModalContainer>
            <ModalContent>
              <StyledText style={{ fontFamily: genreStyle.fontFamily || 'default', fontSize: 24, fontWeight: 'bold' }}>
                {film.title}
              </StyledText>
              <ScrollView>
                <StyledText style={{ fontFamily: genreStyle.fontFamily || 'default', fontSize: 16 }}>
                  {film.overview}
                </StyledText>
              </ScrollView>
              <ButtonContainer>
                <Button
                  title="Close"
                  color={genreStyle.buttonColor || theme.styles.button.backgroundColor}
                  onPress={() => setModalVisible(false)}
                />
              </ButtonContainer>
            </ModalContent>
          </ModalContainer>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default FilmDetail;
