import { useState } from "react";
import { Dimensions, Modal, TouchableWithoutFeedback } from "react-native";
import useDispatch from "../hooks/useDispatch";
import useSelector from "../hooks/useSelector";
import { selectHidden, setHidden } from "../store/feature/app/appSlice";
import { View } from "./Themed";

const { width, height } = Dimensions.get("window");

const Overlay = () => {
  const hidden = useSelector(selectHidden);

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  return (
    <Modal
      hardwareAccelerated={true}
      statusBarTranslucent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={() => dispatch(setHidden(true))}>
        <View
          style={{
            height: height,
            width: width,
            position: "absolute",
            backgroundColor: "black",
            opacity: 0.5,
            zIndex: 100,
          }}
        />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Overlay;
