import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { BackHandler } from "react-native";
import { View } from "../../components/Themed";
import useDispatch from "../../hooks/useDispatch";
import useSelector from "../../hooks/useSelector";
import { selectHidden, setHidden } from "../../store/feature/app/appSlice";
import BookList from "./BookList";
import TopBar from "./TopBar";

const BookShelfScreen = () => {
  const hidden = useSelector(selectHidden);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (!hidden) {
          return true;
        }
        dispatch(setHidden(false));
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", backAction);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [hidden])
  );

  return (
    <View>
      <TopBar />
      <BookList />
    </View>
  );
};

export default BookShelfScreen;
