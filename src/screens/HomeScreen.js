import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  toDate,
} from 'date-fns';

import * as firebase from '../services/firebase';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import { AuthContext } from '../navigation/AuthProvider';

export default function HomeScreen() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = React.useContext(AuthContext);

  function setLikes(index, userId, increase) {
    let newData = data;
    if (increase) {
      if (!newData[index].likes) {
        newData[index].likes = [];
      }
      newData[index].likes.push(userId);
    } else {
      let i = newData[index].likes.findIndex((d) => d === userId);
      if (i !== -1) {
        newData[index].likes = newData[index].likes.filter(
          (likeItem, likeIndex) => likeIndex !== i
        );
      }
    }
    setData(newData);
  }

  React.useEffect(() => {
    function formatAndSet(val) {
      if (!val) {
        setLoading(false);
        return;
      }
      const ids = Object.keys(val);
      let newData = [];
      function formatDate(timestamp) {
        const date = toDate(timestamp);
        let difInSeconds = differenceInSeconds(new Date(), date);
        let difInMinutes = differenceInMinutes(new Date(), date);
        let difInHours = differenceInHours(new Date(), date);
        let difInDays = differenceInDays(new Date(), date);

        if (difInSeconds < 60) {
          return 'há ' + difInSeconds + ' segundos';
        } else if (difInMinutes < 60) {
          return 'há ' + difInMinutes + ' minutos';
        } else if (difInHours < 24) {
          return 'há ' + difInHours + ' horas';
        } else {
          return 'há ' + difInDays + ' dias';
        }
      }
      const treating = Object.values(val).sort((a, b) => {
        if (new Date(a.time) < new Date(b.time)) {
          return 1;
        } else if (new Date(a.time) > new Date(b.time)) {
          return -1;
        }
      });
      treating.map(async (item, index) => {
        let User = await firebase.get(`/users/${item.user}`);

        newData = [
          ...newData,
          {
            ...item,
            timeLabel: formatDate(item.time),
            id: ids[index],
            user: { ...User },
          },
        ];
        setData(newData);
        setLoading(false);
      });
    }

    async function call() {
      setLoading(true);
      const val = await firebase.get('posts/');
      // const unsub = firebase.realTimeGet('posts/', formatAndSet);
      formatAndSet(val);
      // setLoading(false);
      // return unsub;
    }
    call();
    return () => setData(null);
  }, []);

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : !data ? (
        <NoPostContainer>
          <NoPost>Nenhum post cadastrado ainda :c</NoPost>
        </NoPostContainer>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <PostCard index={index} post={item} setLikes={setLikes} />
          )}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: #fff;
`;
const NoPostContainer = styled.View`
  flex: 1;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const NoPost = styled.Text`
  font-size: 20px;
`;
