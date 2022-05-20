import { useMemo } from "react";
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import useDispatch from "../hooks/useDispatch";
import useSelector from "../hooks/useSelector";
import { selectVisible, setVisible } from "../store/feature/app/appSlice";
import { View } from "./Themed";

const { width, height } = Dimensions.get("window");

const Overlay = () => {
  const visible = useSelector(selectVisible);

  const dispatch = useDispatch();

  return useMemo(
    () => (
      <TouchableWithoutFeedback onPress={() => dispatch(setVisible(false))}>
        <View
          style={[styles.container, visible ? undefined : { display: "none" }]}
        />
      </TouchableWithoutFeedback>
    ),
    [visible]
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
    zIndex: 10,
  },
});

export default Overlay;
