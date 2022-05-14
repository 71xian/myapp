import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { View, Text } from "../../components/Themed";

import Header from "./Header";

interface Item {
  id: number;
  title: string;
}

const data: Item[] = [
  {
    id: 1,
    title: "我吃西红柿",
  },
  {
    id: 2,
    title: "second item",
  },
  {
    id: 3,
    title: "third item",
  },
  {
    id: 4,
    title: "good item",
  },
  {
    id: 5,
    title: "good item",
  },
  {
    id: 6,
    title: "good item",
  },
  {
    id: 7,
    title: "good item",
  },
  {
    id: 8,
    title: "good item",
  },
  {
    id: 11,
    title: "good item",
  },
  {
    id: 12,
    title: "good item",
  },
  {
    id: 13,
    title: "good item",
  },
  {
    id: 15,
    title: "good item",
  },
];

export default function BookList() {
  const navigation = useNavigation();

  return (
    <FlatList
      ListHeaderComponent={<Header />}
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("Novel")}
            key={item.id}
          >
            <View style={styles.container}>
              <Image
                source={require("../../assets/images/pexels-athena-2582937.jpg")}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.info}>{item.title}</Text>
                <Text style={styles.info}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 8,
    marginLeft: 8,
  },
  image: {
    width: 48,
    height: 64,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  infoContainer: {
    justifyContent: "space-around",
  },
  info: {
    fontSize: 16,
    color: "grey",
  },
});
