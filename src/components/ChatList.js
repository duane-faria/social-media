import React from 'react';
import styled from 'styled-components';

export default function ChatList({ profileImageUrl, user }) {
  return (
    <Container>
      {profileImageUrl ? (
        <Image source={{ uri: profileImageUrl }} />
      ) : (
        <FakeImage />
      )}
      <UserInfo>
        <User>{user.name}</User>
      </UserInfo>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  margin: 20px;
`;

const FakeImage = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: white;
`;

const Image = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
const UserInfo = styled.View`
  flex-direction: row;
  margin-left: 10px;
`;
const User = styled.Text`
  font-size: 18px;
`;
