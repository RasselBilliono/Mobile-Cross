import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updatePost } from "./services/axios"; 

export default function Form() {
  const route = useRoute();
  const navigation = useNavigation();
  const { post, updatePostInList } = route.params; 

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleUpdatePost = () => {
    const updatedPost = { ...post, title, body };
    updatePost(post.id, updatedPost)
      .then((res) => {
        if (res.status === 200) {
          Alert.alert("Success", "Post updated successfully!");
          updatePostInList(updatedPost); 
          navigation.goBack(); 
        }
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Error", "Failed to update post.");
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        value={body}
        onChangeText={setBody}
        placeholder="Body"
        multiline
      />
      <Button title="Update Post" onPress={handleUpdatePost} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
