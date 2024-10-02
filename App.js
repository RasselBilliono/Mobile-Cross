import { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import NIMInput from "./Input";

const Input = ({ name, onChangeText }) => {
  console.log(name);
  return (
    <View>
      <Text>Name</Text>
      <TextInput
        placeholder="Input your name"
        style={{
          borderColor: "black",
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
        }}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default function App() {
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");

  const handleChangeMyName = (value) => {
    setName(value);
  };

  const handleChangeMyNIM = (value) => {
    setNim(value);
  };

  return (
    <View style={styles.container}>
      <Text>
        {name} - {nim}
      </Text>
      <Input name={name} onChangeText={handleChangeMyName} />
      <NIMInput nim={nim} onChangeText={handleChangeMyNIM} />
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
});
