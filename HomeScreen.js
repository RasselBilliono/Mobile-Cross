import { View, Button, Text } from "react-native";
import { styles } from "./App";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Navigation List</Text>
      <Button title="Email" onPress={() => navigation.navigate("Email")} />
      <Button title="UserList" onPress={() => navigation.navigate("UserList")} />
    </View>
  );
};

export default HomeScreen;
