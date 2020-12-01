import React from 'react';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as firebase from '../services/firebase';
import { AuthContext } from '../navigation/AuthProvider';

export default function PostCard({ index, post, setLikes }) {
  const { user } = React.useContext(AuthContext);
  const [liked, setLiked] = React.useState(false);

  React.useEffect(() => {
    if (post.likes) {
      let tmp = post.likes.some((li) => li === user.uid);
      if (tmp) {
        setLiked(true);
      }
    }
  }, [post.likes, user.uid]);

  function handleLike() {
    if (liked) {
      setLiked(false);
      setLikes(index, user.uid, false);
    } else {
      setLiked(true);
      setLikes(index, user.uid, true);
    }

    if (post.likes) {
      firebase.put(`/posts/${post.id}`, {
        likes: [...post.likes],
      });
    } else if (liked === false) {
      firebase.put(`/posts/${post.id}`, {
        likes: [user.uid],
      });
    }
  }

  const likeIcon = liked ? 'heart' : 'heart-outline';
  const likeIconColor = liked ? '#2e64e5' : '#333';

  return (
    <>
      <Container>
        <UserInfo>
          {post.user.profileImage ? (
            <UserImage
              source={{
                uri: post.user.profileImage,
              }}
            />
          ) : (
            // <UserImage
            //   source={{
            //     uri:
            //       'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1533&q=80',
            //   }}
            // />
            <FakeImage />
          )}
          <UserNameContainer>
            <UserName>{post.user.name}</UserName>
            <PostTime>{post.timeLabel}</PostTime>
          </UserNameContainer>
        </UserInfo>
        <PostText>{post.content}</PostText>
        {post.image ? (
          <PostImage
            source={{
              uri: post.image,
            }}
            style={{ aspectRatio: 1 }}
            resizeMode="contain"
          />
        ) : (
          <Bar />
        )}
        <InteractionContainer>
          <Interaction active={liked} onPress={() => handleLike()}>
            <Ionicons name={likeIcon} size={25} color={likeIconColor} />
            <InteractionText active={liked}>
              {post.likes ? post.likes.length + ' Likes' : 'Like'}
            </InteractionText>
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
  /* height: auto; */
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
  margin-bottom: 5px;
`;

const InteractionText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${({ active }) => (active ? '#2e64e5' : ' #333')};
  margin-left: 5px;
`;

const Bar = styled.View`
  height: 2px;
  background-color: #ddd;
  margin: 10px 15px;
`;

const FakeImage = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: white;
`;
