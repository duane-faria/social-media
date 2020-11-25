import ImagePicker from 'react-native-image-picker';

export function LaunchImageLibrary() {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'socialapp',
    },
  };
  return new Promise(function (resolve, reject) {
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
        resolve(file);
      }
    });
  });
}

// export const useLaunchImageLibrary = () => {
//   // const [image, setImage] = React.useState(null);
//   let options = {
//     storageOptions: {
//       skipBackup: true,
//       path: 'socialapp',
//     },
//   };
//   ImagePicker.launchImageLibrary(options, (response) => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('ImagePicker Error: ', response.error);
//     } else if (response.customButton) {
//       console.log('User tapped custom button: ', response.customButton);
//     } else {
//       let file = {
//         name: response.fileName,
//         path: response.path,
//         uri: response.uri,
//       };
//       console.log(file);
//       // setImage(file);
//     }
//   });
//   // return image;
// };
