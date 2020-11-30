import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components/native';

import ChatList from '../components/ChatList';
import * as firebase from '../services/firebase';

export default function MessageScreen(props) {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    async function makeGet() {
      let res = await firebase.get('/users');
      res = Object.values(res);
      setUsers(res);
    }
    makeGet();
  }, []);

  return (
    <View style={{ position: 'relative', flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ChatList user={item} profileImageUrl={item.profileImage} />
        )}
      />
      {users && users[0] && (
        <ChatList
          user={users[0].name}
          profileImageUrl={users[0].profileImage}
        />
      )}
      <ChatArea>
        <TextArea placeholder="Escreva uma mensagem..." />
        <ButtonContainer>
          <ButtonText>Enviar</ButtonText>
        </ButtonContainer>
      </ChatArea>
    </View>
  );
}

const ChatArea = styled.View`
  height: 100px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  background-color: #f8f8f8;
  border-color: #b2b2b2;
  position: absolute;
  bottom: 0;
`;

const TextArea = styled.TextInput``;
const ButtonContainer = styled.TouchableOpacity``;
const ButtonText = styled.Text``;
