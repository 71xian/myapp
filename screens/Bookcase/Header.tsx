import { ImageBackground, StyleSheet, ToastAndroid } from "react-native";
import { View, Text } from "../../components/Themed";

const Header = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/pexels-faik-akmd-1025469.jpg")}
        style={styles.image}
        imageStyle={{ resizeMode: "stretch" }}
      >
        <View style={styles.titleContainer}>
          <Text
            style={styles.titleText}
            onPress={() =>
              ToastAndroid.show("功能未准备好", ToastAndroid.SHORT)
            }
          >
            这是一个推荐小说的位置，不能随意更改
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    marginBottom: 24,
  },
  image: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    position: "absolute",
    bottom: -14,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 4,
    elevation: 4,
  },
  titleText: {
    color: "gray",
    fontSize: 12,
  },
});

export default Header;
