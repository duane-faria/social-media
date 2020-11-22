import React from 'react';
import { ScrollView, FlatList } from 'react-native';
import styled from 'styled-components';

import PostCard from '../components/PostCard';

const posts = [
  {
    id: 1,
    userName: 'Rafaela Almeida',
    postTime: 'há 5 min',
    post: 'Olá esse é um post',
    postImage: '',
    liked: false,
    likes: 0,
    comments: 0,
  },
  {
    id: 2,
    userName: 'Jessica Albuquerque',
    postTime: 'há 5 min',
    post: 'Olá esse é um post',
    postImage: '',
    liked: false,
    likes: 0,
    comments: 0,
  },
  {
    id: 3,
    userName: 'Ashley',
    postTime: 'há 5 min',
    post: 'Olá esse é um post',
    postImage: '',
    liked: false,
    likes: 0,
    comments: 0,
  },
];

export default function HomeScreen() {
  return (
    <Container>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => String(item.id)}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: #fff;
`;
