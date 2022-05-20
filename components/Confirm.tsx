import { transform } from "@babel/core";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import useDispatch from "../hooks/useDispatch";
import useSelector from "../hooks/useSelector";
import { selectVisible, setVisible } from "../store/feature/app/appSlice";
import { View, Text } from "./Themed";

const Confirm = () => {
  const visible = useSelector(selectVisible);

  const dispatch = useDispatch();

  const fadeAnimate = useRef(new Animated.Value(180)).current;

  const fadeEnter = () => {
    Animated.timing(fadeAnimate, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeLeave = () => {
    Animated.timing(fadeAnimate, {
      toValue: 180,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    visible ? fadeEnter() : fadeLeave();
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: fadeAnimate }],
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ padding: 8 }}>提示</Text>
        <View style={styles.text}>
          <Text style={{ fontSize: 18 }}>确定退出QQ阅读</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", height: 48, elevation: 4 }}>
        <TouchableNativeFeedback
          useForeground={true}
          onPress={() => BackHandler.exitApp()}
        >
          <View style={[styles.button, { backgroundColor: "red" }]}>
            <Text style={{ color: "white" }}>确认</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          useForeground={true}
          onPress={() => dispatch(setVisible(false))}
        >
          <View style={styles.button}>
            <Text>取消</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </Animated.View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 180,
    width: width,
    zIndex: 100,
    bottom: 0,
    elevation: 4,
    backgroundColor: "white",
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Confirm;
