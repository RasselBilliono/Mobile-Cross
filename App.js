import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getPosts } from "./services/axios";
import { Card, Text } from "react-native-paper";
import Form from "./Form";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    getPosts().then((res) => {
      if (res.status === 200) {
        setPosts(res.data);
      }
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const updatePostInList = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  const renderListItem = ({ item }) => (
    <Pressable
      key={item.id}
      onPress={() => navigation.navigate("Form", { post: item, updatePostInList })}
    >
      <Card>
        <Card.Title title={item.title} />
        <Card.Content>
          <Text variant="bodyMedium">{item.body}</Text>
        </Card.Content>
      </Card>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text>Rassel Billiono - 00000037399</Text>
      {posts.length > 0 && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderListItem}
        />
      )}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Posts" }} />
        <Stack.Screen name="Form" component={Form} options={{ title: "Edit Post" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
  },
});
