import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { BackHandler } from "react-native";
import { View } from "../../components/Themed";
import useDispatch from "../../hooks/useDispatch";
import useSelector from "../../hooks/useSelector";
import { selectVisible, setVisible } from "../../store/feature/app/appSlice";
import { RootStackScreenProps, RootTabScreenProps } from "../../types";
import BookList from "./BookList";
import TopBar from "./TopBar";

const BookShelfScreen = ({ navigation }: RootTabScreenProps<"BookShelf">) => {
  const visible = useSelector(selectVisible);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (!visible) {
          dispatch(setVisible(true));
        }
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", backAction);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [visible])
  );

  return (
    <View>
      <TopBar />
      <BookList />
    </View>
  );
};

export default BookShelfScreen;
