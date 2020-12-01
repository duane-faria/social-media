import React from 'react';
import {
  View,
  Text,
  FlatList,
  Keyboard,
  ScrollView,
  LogBox,
} from 'react-native';
import styled from 'styled-components/native';

import * as firebase from '../services/firebase';
import { AuthContext } from '../navigation/AuthProvider';
import Spinner from '../components/Spinner';

export default function MessageScreen(props) {
  const [loading, setLoading] = React.useState(false);
  const [User, setUser] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState();
  const { user } = React.useContext(AuthContext);
  const scroll = React.useRef();
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message

  React.useEffect(() => {
    setLoading(true);

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
      setLoading(false);
    }
    makeGet();
    return makeGet;
  }, [user]);

  async function sendMessage(text) {
    if (text) {
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
    setLoading(true);
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
        setLoading(false);
      }
    }
    firebase.realTimeGet('messages/', getMessages);
    scroll.current.scrollToEnd();
  }, []);

  return (
    <View
      style={{
        position: 'relative',
        flex: 1,
        paddingTop: 20,
        backgroundColor: 'white',
      }}>
      {loading && <Spinner />}

      <ScrollView
        style={{ marginBottom: 120 }}
        ref={scroll}
        onContentSizeChange={() =>
          scroll.current.scrollToEnd({ animated: true })
        }>
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
  /* background-color: #f8f8f8; */
  background-color: #f1f6f9;
  border-color: #b2b2b2;
  position: absolute;
  bottom: 0;
`;

const TextArea = styled.TextInput``;
const ButtonContainer = styled.TouchableOpacity``;
const ButtonText = styled.Text`
  color: #14274e;
`;
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
