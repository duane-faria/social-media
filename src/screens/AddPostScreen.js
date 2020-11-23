import React from 'react';
import styled from 'styled-components';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
export default function AddPostScreen(props) {
  return (
    <InputWrapper>
      <InputField
        placeholder="O que está em sua mente?"
        multiline
        numberOfLines={4}
      />
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Tirar uma foto"
          onPress={() => console.log('notes tapped!')}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Escolher foto"
          onPress={() => {}}>
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
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
