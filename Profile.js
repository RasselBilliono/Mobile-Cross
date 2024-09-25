import { View, Button, Text, Image } from "react-native";

const Profile = ({ navigation, route }) => {
  const { user } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{alignItems: "center"}}>
        <Image
          style={{ borderRadius: 999, width: 75, height: 75 }}
          source={{
            uri: user.photo_url,
          }}
        />
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>
      <Button title="Go Back" onPress={() => navigation.navigate("UserList")} />
    </View>
  );
};

export default Profile;
