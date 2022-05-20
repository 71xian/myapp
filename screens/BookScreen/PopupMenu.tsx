import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import Layout from "../../constants/Layout";
import useDispatch from "../../hooks/useDispatch";
import useSelector from "../../hooks/useSelector";
import {
  selectFontSize,
  selectSystem,
  selectBrightness,
  setBrightness,
  setSystem,
  setFontsize,
} from "../../store/feature/book/bookSlice";

const { width, scale } = Layout.window;

interface Props {
  hidden: boolean;
  onChange: () => void;
}

const PopupMenu = ({ hidden, onChange }: Props) => {
  const dispatch = useDispatch();
  const fontSize = useSelector(selectFontSize);
  const system = useSelector(selectSystem);
  const brightness = useSelector(selectBrightness);

  const fadeAnimate = useRef(new Animated.Value(240)).current;

  const fadeEnter = () => {
    Animated.timing(fadeAnimate, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeLeave = () => {
    Animated.timing(fadeAnimate, {
      toValue: 240,
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
        style={[
          styles.container,
          {
            transform: [{ translateY: fadeAnimate }],
          },
        ]}
      >
        <View style={styles.item}>
          <Text style={styles.itemtext}>亮度</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={brightness}
            onValueChange={(value) => dispatch(setBrightness(value))}
          />
          <TouchableOpacity onPress={() => dispatch(setSystem(!system))}>
            <Text
              style={[styles.boxtext, system ? styles.active : styles.inactive]}
            >
              跟随系统
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemtext}>字号</Text>
          <TouchableOpacity
            onPress={() => {
              if (fontSize <= 12) {
                return;
              }
              dispatch(setFontsize(fontSize - 2));
            }}
          >
            <Text style={styles.fontSizeStyle}>A-</Text>
          </TouchableOpacity>
          <Text>{fontSize * scale}</Text>
          <TouchableOpacity
            onPress={() => {
              if (fontSize >= 20) {
                return;
              }
              dispatch(setFontsize(fontSize + 2));
            }}
          >
            <Text style={styles.fontSizeStyle}>A+</Text>
          </TouchableOpacity>
          <TouchableNativeFeedback useForeground={true} onPress={onChange}>
            <Text style={styles.boxtext}>系统字体 {">"}</Text>
          </TouchableNativeFeedback>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingVertical: 16 }}
        >
          <Text>主题</Text>
        </ScrollView>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuitem}>
            <AntDesign name="bars" size={24} color="grey" />
            <Text style={styles.menutext}>夜间</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuitem}>
            <AntDesign name="setting" size={24} color="grey" />
            <Text style={styles.menutext}>关闭护眼</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuitem}>
            <AntDesign name="HTML" size={24} color="grey" />
            <Text style={styles.menutext}>自动阅读</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuitem}>
            <AntDesign name="HTML" size={24} color="grey" />
            <Text style={styles.menutext}>更多设置</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    ),
    [hidden, system, brightness, fontSize]
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 120,
    bottom: 0,
    backgroundColor: "white",
    height: 240,
    width: width,
    justifyContent: "space-between",
  },
  itemtext: {
    fontSize: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  active: {
    backgroundColor: "red",
    color: "white",
  },
  inactive: {
    backgroundColor: "white",
    color: "red",
  },
  boxtext: {
    fontSize: 12,
    padding: 8,
    borderRadius: 16,
    color: "white",
    backgroundColor: "black",
  },
  fontSizeStyle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "gray",
    borderRadius: 8,
    color: "white",
  },
  menutext: {
    color: "gray",
    fontSize: 12,
  },
  menuitem: {
    flex: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default PopupMenu;
