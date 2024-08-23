import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  padding: 20px;
`;

export const FilmItem = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const FilmImage = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 10px;
  margin-right: 10px;
`;

export const TextContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const CloseButton = styled.TouchableOpacity.attrs({
  testID: 'close-button',
})`
  padding: 10px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
`;
