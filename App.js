import { CameraMode, CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View, Alert, FlatList, Image } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./FirebaseConfig";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const ref = useRef(null);
  const [uri, setUri] = useState(null);
  const [mode, setMode] = useState("picture");
  const [facing, setFacing] = useState("back");
  const [recording, setRecording] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(false); // State to toggle camera visibility
  const [gallery, setGallery] = useState([]); // State to store gallery images
  const [isGalleryVisible, setIsGalleryVisible] = useState(false); // State to toggle gallery view
  const [Longitude, setLongitude] = useState("");
  const [Latitude, setLatitude] = useState("");

  // Ensure permissions are granted
  if (!permission || !mediaPermission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>We need your permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  if (!mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>We need your permission to save media to the gallery</Text>
        <Button onPress={requestMediaPermission} title="Grant media access" />
      </View>
    );
  }

  // Function to save data to Firestore
  const saveToFirestore = async (photoUri, latitude, longitude) => {
    try {
      const docRef = await addDoc(collection(db, "photos"), {
        photoUri,
        latitude,
        longitude,
        timestamp: new Date().toISOString(),
      });
      Alert.alert("Success!", `Data saved with ID: ${docRef.id}`);
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      Alert.alert("Error", "Failed to save data to Firestore");
    }
  };

  // Function to take a picture
  const takePicture = async () => {
    try {
      const photo = await ref.current?.takePictureAsync();
      setUri(photo?.uri);

      // Save the photo to the gallery
      if (photo?.uri) {
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        await MediaLibrary.createAlbumAsync("Camera", asset, false);
        Alert.alert("Saved!", "Photo saved to gallery.");

        // Get current location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          setLatitude(latitude);
          setLongitude(longitude);

          // Save to Firestore
          await saveToFirestore(photo.uri, latitude, longitude);
        } else {
          Alert.alert("Permission denied", "We need location access to save coordinates.");
        }
      }
    } catch (error) {
      console.error("Error taking picture:", error);
      Alert.alert("Error", "Failed to take picture");
    }
  };

  // Function to toggle between photo and video modes
  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  // Function to switch camera facing
  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  // Function to load images from the gallery
  const loadGallery = async () => {
    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: [MediaLibrary.MediaType.photo],
      sortBy: [MediaLibrary.SortBy.creationTime],
      first: 50,
    });

    setGallery(assets);
  };

  // Render the picture that was taken
  const renderPicture = () => {
    if (!uri) return null;
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri }} style={styles.image} />
        <Button onPress={() => setUri(null)} title="Take another picture" />
      </View>
    );
  };

  // Render the camera view
  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        mode={mode}
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.shutterContainer}>
          <Pressable onPress={toggleMode}>
            {mode === "picture" ? (
              <AntDesign name="picture" size={32} color="white" />
            ) : (
              <Feather name="video" size={32} color="white" />
            )}
          </Pressable>
          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View style={[styles.shutterBtn, { opacity: pressed ? 0.5 : 1 }]}>
                <View
                  style={[
                    styles.shutterBtnInner,
                    { backgroundColor: mode === "picture" ? "white" : "red" },
                  ]}
                />
              </View>
            )}
          </Pressable>
          <Pressable onPress={toggleFacing}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </Pressable>
        </View>
        <Button onPress={() => setIsCameraVisible(false)} title="Close Camera" />
      </CameraView>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Rassel Billiono - 00000037399</Text>
      {!isCameraVisible ? (
        <Button onPress={() => setIsCameraVisible(true)} title="Open Camera" />
      ) : (
        <Button onPress={() => setIsCameraVisible(false)} title="Close Camera" />
      )}
      <Button
        onPress={() => {
          if (isGalleryVisible) {
            setIsGalleryVisible(false);
          } else {
            loadGallery();
            setIsGalleryVisible(true);
          }
        }}
        title={isGalleryVisible ? "Close Gallery" : "Open Gallery"}
      />
      {Longitude && Latitude && <Text>Longitude: {Longitude}</Text>}
      {Longitude && Latitude && <Text>Latitude: {Latitude}</Text>}
      {uri ? renderPicture() : isCameraVisible && renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 300,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  galleryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  galleryItem: {
    marginBottom: 10,
  },
  galleryImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
