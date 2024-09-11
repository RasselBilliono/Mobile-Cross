import { View, Text } from "react-native";

const UserInfo = ({ name, age }) => {
  return (
    <View>
      <Text>Halo nama ku, {name}</Text>
      <Text>Umur ku, {age}</Text>
    </View>
  );
};

export default UserInfo;
