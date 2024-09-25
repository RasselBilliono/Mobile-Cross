import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import Email from "./Email";
import UserList from "./UserList";
import Profile from "./Profile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Email" component={Email} />
          <Stack.Screen name="UserList" component={UserList} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardScrollview: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
});
