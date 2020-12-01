import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { LaunchImageLibrary } from '../utils/native';
import * as firebase from '../services/firebase';
import Spinner from '../components/Spinner';

export default function ProfileScreen(props) {
  const [loading, setLoading] = React.useState(false);
  const { logout, user } = React.useContext(AuthContext);
  const [file, setFile] = React.useState(null);

  React.useEffect(() => {
    async function call() {
      setLoading(true);
      const userData = await firebase.get(`/users/${user.uid}`);
      if (userData && userData.profileImage) {
        setFile({ uri: userData.profileImage });
      }
      setLoading(false);
    }
    call();
  }, [user]);

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ImageContainer>
            <View style={{ elevation: 6 }}>
              {file ? (
                <Image
                  source={{
                    uri: file.uri,
                  }}
                  resizeMode="cover"
                />
              ) : (
                <FakeImage />
              )}
            </View>
            <TouchableOpacity
              onPress={async () => {
                const f = await LaunchImageLibrary();
                setFile(f);
                const image = await firebase.postFile(f);
                firebase.put(`users/${user.uid}`, { profileImage: image });
              }}
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 5,
                position: 'absolute',
                right: 20,
                bottom: 40,
                borderRadius: 5,
              }}>
              <EvilIcons name="image" size={20} />
              <Text>Editar</Text>
            </TouchableOpacity>
          </ImageContainer>
          <Content>
            <WelcomeMessage>Olá, {user.name}</WelcomeMessage>
            <FormButton title="Sair" onPress={() => logout()} />
          </Content>
        </>
      )}
    </Container>
  );
}
const Container = styled.View`
  align-items: center;
  flex: 1;
  background-color: white;
`;

const Content = styled.View`
  padding: 20px;
  width: 100%;
  margin-top: 18px;
  /* justify-content: space-around; */
  align-items: center;
  flex: 1;
`;

const ImageContainer = styled.View`
  height: 300px;
  width: 100%;
  /* background: #0f2e7a; */
  background: #14274e;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Image = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  /* background: white; */
`;
const FakeImage = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  background: white;
`;

const WelcomeMessage = styled.Text`
  font-size: 30px;
  margin-bottom: 50px;
  color: #394867;
`;
