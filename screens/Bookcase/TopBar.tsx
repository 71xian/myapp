import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Text, View } from "../../components/Themed";

export default function TopBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>书架</Text>
      <TouchableOpacity
        style={styles.buttonLeft}
        onPress={() => ToastAndroid.show("功能未准备好", ToastAndroid.SHORT)}
      >
        <AntDesign name="search1" color="black" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonRight}
        onPress={() => ToastAndroid.show("功能未准备好", ToastAndroid.SHORT)}
      >
        <AntDesign name="menuunfold" color="black" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get("window");

const { currentHeight } = StatusBar;

const styles = StyleSheet.create({
  container: {
    width: width,
    position: "absolute",
    paddingTop: currentHeight,
    backgroundColor: "white",
    alignItems: "center",
    zIndex: 100,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    paddingVertical: 8,
    zIndex: 100,
  },
  buttonLeft: {
    position: "absolute",
    top: currentHeight,
    paddingTop: 8,
    right: 48,
    zIndex: 100,
  },
  buttonRight: {
    position: "absolute",
    top: currentHeight,
    paddingTop: 8,
    right: 12,
    zIndex: 100,
  },
});
