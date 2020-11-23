import database from '@react-native-firebase/database';

export const post = async (endpoint, data) => {
  const newRef = database().ref(endpoint).push();
  await newRef.set(data);
};
