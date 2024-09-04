import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-web";

const data = [
  {
    name: "John Smith",
    email: "johnsmith@example.com",
    photo_url: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    photo_url: "https://randomuser.me/api/portraits/women/75.jpg",
  },
  {
    name: "Michael Johnson",
    email: "michaeljohnson@example.com",
    photo_url: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Emily Williams",
    email: "emilywilliams@example.com",
    photo_url: "https://randomuser.me/api/portraits/women/76.jpg",
  },
  {
    name: "William Brown",
    email: "williambrown@example.com",
    photo_url: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    name: "Olivia Jones",
    email: "oliviajones@example.com",
    photo_url: "https://randomuser.me/api/portraits/women/77.jpg",
  },
  {
    name: "James Miller",
    email: "jamesmiller@example.com",
    photo_url: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  {
    name: "Sophia Davis",
    email: "sophiadavis@example.com",
    photo_url: "https://randomuser.me/api/portraits/women/78.jpg",
  },
  {
    name: "Ethan Garcia",
    email: "ethangarcia@example.com",
    photo_url: "https://randomuser.me/api/portraits/men/79.jpg",
  },
  {
    name: "Ava Rodriguez",
    email: "avarodriguez@example.com",
    photo_url: "https://randomuser.me/api/portraits/women/79.jpg",
  },
  {
    name: "David Wilson",
    email: "davidwilson@example.com",
    photo_url: "https://randomuser.me/api/portraits/men/80.jpg",
  },
  {
    name: "Sophia Taylor",
    email: "sophiataylor@example.com",
    photo_url: "https://randomuser.me/api/portraits/women/80.jpg",
  },
  {
    name: "Daniel Anderson",
    email: "danielanderson@example.com",
    photo_url: "https://randomuser.me/api/portraits/men/81.jpg",
  },
  {
    name: "Madison Lopez",
    email: "madisonlopez@example.com",
    photo_url: "https://randomuser.me/api/portraits/women/81.jpg",
  },
  {
    name: "Matthew Martinez",
    email: "matthewmartinez@example.com",
    photo_url: "https://randomuser.me/api/portraits/men/82.jpg",
  },
  {
    name: "Ava Hernandez",
    email: "avahernandez@example.com",
    photo_url: "https://randomuser.me/api/portraits/women/82.jpg",
  },
  {
    name: "Joseph Brooks",
    email: "josephbrooks@example.com",
    photo_url: "https://randomuser.me/api/portraits/men/83.jpg",
  },
  {
    name: "Evelyn Perez",
    email: "evelynperez@example.com",
    photo_url: "https://randomuser.me/api/portraits/women/83.jpg",
  },
  {
    name: "Christopher Harris",
    email: "christopherharris@example.com",
    photo_url: "https://randomuser.me/api/portraits/men/84.jpg",
  },
  {
    name: "Abigail King",
    email: "abigailking@example.com",
    photo_url: "https://randomuser.me/api/portraits/women/84.jpg",
  },
];

export default function App() {
  
  return (
    <View style={styles.container}>
      <ScrollView>
        {data.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Image
              source={{ uri: item.photo_url }}
              style={styles.listItemImage}
            />
            <Text style={styles.listItemName}>{item.name}</Text>
            <Text style={styles.listItemEmail}>{item.email}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  listItem: {
    alignItems: "center",
    marginBottom: 20,
  },
  listItemImage: {
    height: 150,
    width: 130,
  },
  listItemName: {
    fontWeight: "bold",
  },
  listItemEmail: {
    fontWeight: "bold",
  },
});
