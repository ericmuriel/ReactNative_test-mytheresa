import React, { useContext } from 'react';
import { FlatList, TouchableOpacity, ScrollView, Text, View, Image } from 'react-native';
import { SectionContainer, FilmCard, FilmImage, FilmTitle } from './FilmListStyled';
import { GenericContext } from '@/context/GenericContext';
import { useTheme } from '../../constants/ThemeContext';

const FilmList: React.FC<any> = ({ navigation }) => {
  const { data } = useContext(GenericContext);
  const theme = useTheme();

  const genreIds: Record<string, number[]> = {
    Crime: [80],
    Comedy: [35],
    War: [10752],
  };

  const sections = Object.keys(genreIds).map(genre => ({
    title: genre,
    films: data.filter((item: any) => {
      return genreIds[genre].some((id: number) => item.genre_ids.includes(id));
    }),
  }));

  const renderFilmItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { film: item })}
      testID={`film-item-${item.id}`}
    >
      <FilmCard>
        <FilmImage source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
        <FilmTitle>{item.title}</FilmTitle>
      </FilmCard>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={theme.styles.container}>
      {sections.map((section, index) => (
        <SectionContainer key={index} testID={`section-${section.title}`}>
          <Text style={theme.styles.title}>{section.title}</Text>
          <FlatList
            data={section.films}
            renderItem={renderFilmItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </SectionContainer>
      ))}
    </ScrollView>
  );
};

export default FilmList;
