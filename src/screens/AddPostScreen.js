import React from 'react';
import styled from 'styled-components';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { utils } from '@react-native-firebase/app';
import { postFile } from '../services/firebase';
import { AuthContext } from '../navigation/AuthProvider';

export default function AddPostScreen(props) {
  const { setPost, post } = React.useContext(AuthContext);
  const [image, setImage] = React.useState(null);

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
        let file = {
          name: response.fileName,
          path: response.path,
        };
        setPost((p) => ({ ...p, file }));
      }
    });
  };
  function launchCamera() {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'socialapp',
      },
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
        let file = {
          name: response.fileName,
          path: response.path,
        };
        setPost((p) => ({ ...p, file }));
      }
    });
  }
  return (
    <InputWrapper>
      <InputField
        placeholder="O que está em sua mente?"
        multiline
        numberOfLines={4}
        value={post}
        onChangeText={
          (text) => setPost((post) => ({ ...post, content: text }))
          // setPost((post) => ({ postContent: text }))
        }
      />
      {image && <PostImage source={{ uri: image.fileUri }} />}
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Tirar uma foto"
          onPress={() => launchCamera()}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Escolher foto"
          onPress={() => launchImageLibrary()}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </InputWrapper>
  );
}
const InputWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* background: #2e64e5; */
  background: #2e64e515;
`;

const InputField = styled.TextInput`
  justify-content: center;
  align-items: center;
  font-size: 24px;
  text-align: center;
`;
const PostImage = styled.Image`
  width: 100%;
  height: 350px;
`;
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
