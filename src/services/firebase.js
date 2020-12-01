import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export const post = async (endpoint, data) => {
  const newRef = database().ref(endpoint).push();
  await newRef.set(data);
};

export const postWithRef = async (endpoint, data) => {
  await database().ref(endpoint).set(data);
};

export const postFile = async (file) => {
  const reference = storage().ref(file.name);
  await reference.putFile(file.path);

  const url = await storage().ref(file.name).getDownloadURL();
  return url;
};

export const get = async (endpoint) => {
  return new Promise((resolve, reject) => {
    database()
      .ref(endpoint)
      .once('value', (snp) => resolve(snp.val()));
  });
  // const data = await database()
  //   .ref(endpoint)
  //   .once('value', (snp) => callback(snp.val()));
};

export const realTimeGet = async (endpoint, callback) => {
  const onValueChange = database()
    .ref(endpoint)
    .on('value', (snapshot) => {
      callback(snapshot.val());
    });

  return () => database().ref(endpoint).off('value', onValueChange);
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
