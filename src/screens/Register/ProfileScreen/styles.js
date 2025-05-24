import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

export const AvatarContainer = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: #ddd;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 75px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  width: 80%;
  align-items: center;
`;

export const ConfirmButton = styled(Button)`
  background-color: #28a745;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
