import { View, Button , Text} from "react-native";

const Email = ({ navigation }) => {
  return (
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <Text>Email List Page</Text>
      <Button title="Go Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default Email;
