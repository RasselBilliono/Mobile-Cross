import React, { useState } from "react";
import { StyleSheet, View, Button, PermissionsAndroid, Text, Platform } from "react-native";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import RNFS from "react-native-fs"; 

function App() {
  const [uri, setUri] = useState("");

  const saveFile = async (photoUri) => {
    try {
      const fileName = "test_photo.jpg"; 
      const path = RNFS.PicturesDirectoryPath + "/" + fileName;

      await RNFS.copyFile(photoUri, path);
      console.log("Success: Photo saved to Pictures folder.");
    } catch (err) {
      console.error("Error saving photo:", err);
    }
  };

  const openImagePicker = async () => {
    const granted = await requestGalleryPermission();
    if (granted) {
      launchImageLibrary(
        {
          mediaType: "photo",
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        },
        handleResponse
      );
    }
  };

  const handleCameraLaunch = async () => {
    const granted = await requestCameraPermission();
    if (granted) {
      launchCamera(
        {
          mediaType: "photo",
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        },
        handleResponse
      );
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs access to your camera to take photos.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission granted");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const requestGalleryPermission = async () => {
    try {
      if (Platform.OS === "android" && Platform.Version >= 29) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Gallery Permission",
            message: "This app needs access to your gallery to select photos.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Gallery permission granted");
          return true;
        } else {
          console.log("Gallery permission denied");
          return false;
        }
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "This app needs access to your storage to select photos.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleResponse = (response) => {
    if (response.didCancel) {
      console.log("User cancelled image picker");
    } else if (response.error) {
      console.log("Image picker error: ", response.error);
    } else if (response.assets && response.assets.length > 0) {
      const imageUri = response.assets[0].uri;
      setUri(imageUri);
      saveFile(imageUri); 
    } else {
      console.log("No assets found in the response");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Open Image Picker" onPress={openImagePicker} />
      <Button title="Launch Camera" onPress={handleCameraLaunch} />
      {uri ? <Text>Selected Image URI: {uri}</Text> : <Text>No image selected</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

export default App;
