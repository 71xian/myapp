import { StatusBar, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";

const UserScreen = () => {
  return (
    <View style={styles.container}>
      <Text>user</Text>
    </View>
  );
};

const { currentHeight } = StatusBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: currentHeight,
  },
});

export default UserScreen;
