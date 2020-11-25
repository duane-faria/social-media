import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export const post = async (endpoint, data) => {
  const newRef = database().ref(endpoint).push();
  await newRef.set(data);
};

export const postFile = async (file) => {
  const reference = storage().ref(file.name);
  await reference.putFile(file.path);

  const url = await storage().ref(file.name).getDownloadURL();
  return url;
};

export const get = async (endpoint, callback) => {
  const data = await database()
    .ref(endpoint)
    .once('value', (snp) => callback(snp.val()));
};

export const put = async (endpoint, data) => {
  try {
    await database().ref(endpoint).update(data);
    return true;
  } catch (e) {
    console.log('error no update do firebase' + e);
  }
};

export const currentUser = () => {
  return auth().currentUser();
};
