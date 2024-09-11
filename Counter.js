import { View, Button } from "react-native";

const Counter = ({ handleIncrement, handleDecrement, value }) => {
  return (
    <View>
      {value}
      <Button title="Increment" onPress={handleIncrement} />
      <Button title="Decrement" onPress={handleDecrement} />
    </View>
  );
};


export default Counter