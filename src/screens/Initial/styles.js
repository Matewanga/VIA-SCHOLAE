import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: 0 20px;
`;

export const Title = styled.Text`
  font-size: 55px;
  font-weight: bold;
  color: #0e194d;
  text-align: center;
  margin-top: 30px;

  text-shadow-color: pink;
  text-shadow-offset: 2px 2px;
  text-shadow-radius: 4px;
`;

export const Description = styled.Text`
  font-size: 25px;
  color: #262626;
  text-align: justify;
  margin-top: 25px;
  line-height: 32px; 
  padding-horizontal: 10px;
`;


export const SubDescription = styled.Text`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-top: 15px;
  color: #333;
`;

export const Button = styled.TouchableOpacity`
  background-color: #fcdc3b;
  width: 150px;
  border-radius: 20px;
  padding: 10px 30px;
  align-self: center;
  margin-top: 25px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
`;

export const ImagePlaceholder = styled.View`
  margin-top: 40px;
  height: 180px;
  justify-content: center;
  align-items: center;
`;
