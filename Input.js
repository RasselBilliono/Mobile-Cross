import { Text, View, TextInput } from "react-native";

const NIMInput = ({ nim, onChangeText }) => {
  console.log(nim);
  return (
    <View>
      <Text>NIM</Text>
      <TextInput
        placeholder="Input your NIM"
        style={{
          borderColor: "black",
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
        }}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
    </View>
  );
};

export default NIMInput;
