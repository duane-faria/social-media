import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { FloatingAction } from 'react-native-floating-action';

import { AuthContext } from '../navigation/AuthProvider';

export default function AddPostScreen() {
  const { setPost, post } = React.useContext(AuthContext);

  React.useEffect(() => {
    return setPost(null);
  }, [setPost]);

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'socialapp',
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
        let file = {
          name: response.fileName,
          path: response.path,
          uri: response.uri,
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
        let file = {
          name: response.fileName,
          path: response.path,
          uri: response.uri,
        };
        setPost((p) => ({ ...p, file }));
      }
    });
  }
  return (
    <InputWrapper>
      {post && post.error && <Error>o post não pode ser vazio</Error>}
      <InputField
        placeholder="O que está em sua mente?"
        multiline
        numberOfLines={4}
        value={post}
        onChange={(e) =>
          setPost((p) => ({ ...p, content: e.nativeEvent.text }))
        }
      />
      {post && post.file && (
        <PostImage source={{ uri: post.file.uri }} resizeMode="contain" />
      )}

      <FloatingAction
        actions={[
          {
            text: 'Escolher foto',
            icon: (
              <Icon name="md-images-outline" style={styles.actionButtonIcon} />
            ),
            name: 'bt_choose',
            position: 2,
            buttonSize: 59,
            distanceToEdge: 22,
            onPressItem: () => launchImageLibrary(),
          },
          {
            text: 'Tirar foto',
            icon: (
              <Icon
                name="camera-outline"
                style={styles.actionButtonIcon}
                size={120}
              />
            ),
            name: 'bt_take',
            position: 1,
            buttonSize: 59,
            distanceToEdge: 22,
            onPressItem: launchCamera,
          },
        ]}
        onPressItem={(name) => {
          if (name === 'bt_choose') {
            launchImageLibrary();
          } else {
            launchCamera();
          }
        }}
      />
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

const Error = styled.Text`
  color: tomato;
  font-size: 15px;
`;

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 28,
    height: 28,
    color: 'white',
  },
});
