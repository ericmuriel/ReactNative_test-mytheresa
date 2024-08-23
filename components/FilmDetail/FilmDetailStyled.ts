import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Header = styled.View`
  margin-bottom: 20px;
`;

export const ContentContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const ImageArea = styled.View`
  flex: 1;
  margin-right: 10px;
`;

export const DescriptionArea = styled.View`
  flex: 1;
  height:300px;
  justify-content: space-between;
`;

export const FilmImage = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: 10px;
`;

export const AdditionalInfo = styled.View`
  margin-top: 20px;
`;

export const ReadMore = styled.Text`
  color: #1E90FF;
  margin-top: 5px;
  margin-bottom: 6px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

export const ButtonContainer = styled.View`
  margin-top: 20px;
`;

export const Text = styled.Text`
  flex-shrink: 1;
`;
