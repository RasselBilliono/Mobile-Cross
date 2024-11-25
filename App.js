import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  PermissionsAndroid,
  Text,
  Platform,
} from "react-native";
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  const [coords, setCoords] = useState(null);

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setCoords(position.coords);
        console.log(position);
      },
      (error) => {
        console.error(`Code ${error.code}`, error.message);
        console.log(error);
      },
      {
        accuracy: {
          android: "high",
        },
        enableHighAccuracy: true,
        timeout: 15000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === "android" && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      console.log("Location permission denied by user.");
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log("Location permission denied by user.");
    }

    return false;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Geo Location</Text>
      <Button title="Get Geo Location" onPress={getLocation} />
      {coords && (
        <View style={styles.locationContainer}>
          <Text>Longitude: {coords.longitude}</Text>
          <Text>Latitude: {coords.latitude}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  locationContainer: {
    marginTop: 20,
  },
});

export default App;
