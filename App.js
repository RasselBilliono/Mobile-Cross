import { useState } from "react";
import { StyleSheet, Button, TextInput, View } from "react-native";
import Counter from "./Counter";
import UserInfo from "./UserInfo";

export default function App() {
  const [count, setCount] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const [age, setAge] = useState(0);
  const [name, setName] = useState("");

  const handleIncrement = () => {
    setCount(prevState => prevState + 1)
  };

  const handleDecrement = () => {
    setCount(prevState => prevState - 1)
  };

  const submitData = () => {
    setAge(count);
    setName(nameInput);
  };

  return (
    <View style={styles.container}>
      <UserInfo age={age} name={name} />
      <Counter
        value={count}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
      />
      <Button title="Pass Value" onPress={submitData} />
      <TextInput
        onChangeText={setNameInput}
        value={nameInput}
        style={styles.input}
        placeholder="Input your name here"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",n
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
