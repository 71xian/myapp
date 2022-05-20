import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useEffect, useMemo } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import { View } from "../../components/Themed";
import Layout from "../../constants/Layout";

const { width } = Layout.window;

interface Props {
  hidden: boolean;
  onChange: () => void;
  onList: () => void;
}

const BottomMenu = ({ hidden, onChange, onList }: Props) => {
  const navigation = useNavigation();

  const fadeAnimate = useRef(new Animated.Value(48)).current;

  const fadeEnter = () => {
    Animated.timing(fadeAnimate, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeLeave = () => {
    Animated.timing(fadeAnimate, {
      toValue: 48,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    hidden ? fadeLeave() : fadeEnter();
  }, [hidden]);

  return useMemo(
    () => (
      <Animated.View
        style={[styles.container, { transform: [{ translateY: fadeAnimate }] }]}
      >
        <TouchableNativeFeedback
          style={{ flex: 1 }}
          useForeground={true}
          onPress={onList}
        >
          <View style={styles.item}>
            <AntDesign name="bars" size={24} color="grey" />
            <Text style={styles.menutext}>目录</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback style={{ flex: 1 }} onPress={onChange}>
          <View style={styles.item}>
            <AntDesign name="setting" size={24} color="grey" />
            <Text style={styles.menutext}>设置</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback style={{ flex: 1 }}>
          <View style={styles.item}>
            <AntDesign name="HTML" size={24} color="grey" />
            <Text style={styles.menutext}>书友圈</Text>
          </View>
        </TouchableNativeFeedback>
      </Animated.View>
    ),
    [hidden]
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    zIndex: 100,
    backgroundColor: "white",
    height: 48,
    width: width,
    elevation: 4,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menutext: {
    fontSize: 12,
    color: "gray",
  },
});

export default BottomMenu;
