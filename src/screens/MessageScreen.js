import React from 'react';
import {
  View,
  Text,
  FlatList,
  Keyboard,
  Image,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import { GiftedChat } from 'react-native-gifted-chat';

import ChatList from '../components/ChatList';
import * as firebase from '../services/firebase';
import { AuthContext } from '../navigation/AuthProvider';

export default function MessageScreen(props) {
  const [User, setUser] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState();
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    async function makeGet() {
      let res = await firebase.get(`/users/${user.uid}`);
      let allusers = await firebase.get('/users');
      setAllUsers(allusers);
      setUser({
        _id: res.id,
        avatar: res.profileImage,
        email: user.email,
        name: res.name,
      });
    }
    makeGet();
  }, [user]);

  async function sendMessage(text) {
    if (text.length > 0) {
      Keyboard.dismiss();
      const obj = {
        _id: Math.random().toString().split('.')[1],
        text,
        user: user.uid,
        created_at: new Date().getTime(),
      };
      setMessage(null);
      await firebase.post('messages', obj);
    }
  }

  React.useEffect(() => {
    function getMessages(m) {
      if (m) {
        const mTreated = Object.values(m).sort((a, b) => {
          if (a.created_at > b.created_at) {
            return 1;
          } else if (a.created_at < b.created_at) {
            return -1;
          }
        });
        setMessages(mTreated);
      }
    }
    firebase.realTimeGet('messages/', getMessages);
  }, []);

  return (
    <View style={{ position: 'relative', flex: 1, marginTop: 20 }}>
      <ScrollView style={{ marginBottom: 120 }}>
        {messages &&
          messages.map((messa) => {
            let current = false;
            if (messa.user == user.uid) {
              current = true;
            }
            return (
              <MessageContainer key={Math.random()} current={current}>
                {current && allUsers[messa.user] ? (
                  <>
                    <Text>{messa.text}</Text>
                    <UserImage
                      source={{ uri: allUsers[messa.user].profileImage }}
                    />
                  </>
                ) : (
                  allUsers[messa.user] && (
                    <>
                      <UserImage
                        source={{ uri: allUsers[messa.user].profileImage }}
                      />
                      <Text>{messa.text}</Text>
                    </>
                  )
                )}
              </MessageContainer>
            );
          })}
      </ScrollView>
      <ChatArea>
        <TextArea
          placeholder="Escreva uma mensagem..."
          onChangeText={(text) => setMessage(text)}
          value={message}
        />
        <ButtonContainer onPress={() => sendMessage(message)}>
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
const UserImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 0px 5px;
`;

const MessageContainer = styled.View`
  ${({ current }) => {
    switch (current) {
      case true:
        return `flex-direction: row;
        margin-bottom: 20px;
        align-items: center;
        justify-content: flex-end;
        margin-right: 5px;`;
      default:
        return `
            flex-direction: row;
            margin-bottom: 20px;
            align-items: center;
          `;
    }
  }}
`;
