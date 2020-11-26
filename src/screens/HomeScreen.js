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

export default function HomeScreen() {
  const [data, setData] = React.useState(null);

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
      Object.values(val).map(async (item, index) => {
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
      });
    }
    async function call() {
      const val = await firebase.get('posts/');
      formatAndSet(val);
    }
    call();
  }, []);

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <PostCard index={index} post={item} setLikes={setLikes} />
        )}
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
