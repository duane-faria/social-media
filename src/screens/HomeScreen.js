import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import * as firebase from '../services/firebase';
import PostCard from '../components/PostCard';

const posts = [
  {
    id: 1,
    userName: 'Rafaela Almeida',
    postTime: 'há 5 min',
    post: 'Olá esse é um post',
    postImage: 'wadwadwadawdwwadawdawdawda',
    liked: true,
    likes: 0,
    comments: 0,
  },
  {
    id: 2,
    userName: 'Jessica Albuquerque',
    postTime: 'há 5 min',
    post: 'Olá esse é um post',
    postImage: null,
    liked: false,
    likes: 0,
    comments: 0,
  },
  {
    id: 3,
    userName: 'Ashley',
    postTime: 'há 5 min',
    post: 'Olá esse é um post',
    postImage: '1',
    liked: false,
    likes: 0,
    comments: 0,
  },
];

export default function HomeScreen() {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    function formatAndSet(val) {
      setData(Object.values(val));
    }
    firebase.get('posts/', formatAndSet);
  }, []);

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: #fff;
`;
