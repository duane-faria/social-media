import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PostCard({ post }) {
  return (
    <>
      <Container>
        <UserInfo>
          <UserImage
            source={{
              uri:
                'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1533&q=80',
            }}
          />
          <UserNameContainer>
            <UserName>{post.userName}</UserName>
            <PostTime>{post.postTime}</PostTime>
          </UserNameContainer>
        </UserInfo>
        <PostText>{post.post}</PostText>
        <PostImage
          source={{
            uri:
              'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1308&q=80',
          }}
        />
        <InteractionContainer>
          <Interaction active>
            <Ionicons name="heart-outline" size={25} />
            <InteractionText active>Like</InteractionText>
          </Interaction>
          <Interaction>
            <Ionicons name="md-chatbubble-outline" size={25} />
            <InteractionText>Comentar</InteractionText>
          </Interaction>
        </InteractionContainer>
      </Container>
    </>
  );
}
const Container = styled.View`
  background-color: #f8f8f8;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 15px;
`;

const UserImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const UserNameContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
`;

const PostText = styled.Text`
  font-size: 14px;
  font-family: 'Lato-Regular';
  padding-left: 15px;
  padding-right: 35px;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 250px;
  margin-top: 15px;
`;

const InteractionContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
`;

const Interaction = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${({ active }) => (active ? '#2e64e515' : 'transparent')};
  border-radius: 5px;
  padding: 2px 5px;
`;

const InteractionText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${({ active }) => (active ? '#2e64e5' : ' #333')};
  margin-left: 5px;
`;

const Bar = styled.View`
  width: 100%;
  height: 2px;
  background-color: #ddd;
  margin: 10px 0;
`;
