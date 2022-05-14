import { useEffect } from "react";
import { Alert, StatusBar } from "react-native";
import { View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import BookList from "./BookList";
import TopBar from "./TopBar";

const BookCaseScreen = ({ navigation }: RootTabScreenProps<"BookCase">) => {
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "yes", onPress: () => navigation.dispatch(e.data.action) },
      ]);
    });
  }, [navigation]);

  return (
    <View>
      <TopBar />
      <BookList />
      <StatusBar animated={true} hidden={false} />
    </View>
  );
};

export default BookCaseScreen;
