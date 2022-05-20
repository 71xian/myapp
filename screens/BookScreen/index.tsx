import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { setStatusBarHidden } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { getText } from "../../api/book";
import { View } from "../../components/Themed";
import { RootStackScreenProps } from "../../types";
import BottomMenu from "./BottomMenu";
import FontSelect from "./FontSelect";
import List from "./List";
import MoreSetting from "./MoreSetting";
import NovelText from "./NovelText";
import PopupMenu from "./PopupMenu";
import TopMenu from "./TopMenu";

export default function NovelScreen({
  navigation,
}: RootStackScreenProps<"Book">) {
  const [textList, setTextList] = useState<string[]>([]);

  const [hiddenMenu, setHiddenMenu] = useState(true);
  const [hiddenSetting, setHiddenSetting] = useState(true);
  const [hiddenFont, setHiddenFont] = useState(true);

  const [hiddenList, setHiddenList] = useState(true);

  const [hiddenMoreSetting, setHiddenMoreSetting] = useState(true);

  const [show, setShow] = useState(true);

  const fadeAnimate = useRef(new Animated.Value(0)).current;

  const fadeEnter = () => {
    Animated.timing(fadeAnimate, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeLeave = () => {
    Animated.timing(fadeAnimate, {
      toValue: -width,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    hiddenList ? fadeEnter() : fadeLeave();
  }, [hiddenList]);

  useEffect(() => {
    setStatusBarHidden(true, "fade");

    getText("https://www.miaojiang8.net/7_7656/11177687.html").then((res) =>
      setTextList(res.data)
    );

    return () => setStatusBarHidden(false, "fade");
  }, []);

  useEffect(() => {
    setStatusBarHidden(hiddenMenu, "fade");
  }, [hiddenMenu]);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (!hiddenList) {
          setHiddenList(true);
          return true;
        }

        if (!hiddenFont) {
          setHiddenFont(true);
          return true;
        }

        if (!hiddenMenu) {
          setHiddenMenu(true);
          return true;
        }

        if (!hiddenSetting) {
          setHiddenSetting(true);
          return true;
        }

        return false;
      };
      BackHandler.addEventListener("hardwareBackPress", backAction);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [hiddenMenu, hiddenSetting, hiddenFont, hiddenList])
  );

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: fadeAnimate }] }]}
    >
      <Modal
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(!show);
        }}
      >
        <Text>hello</Text>
      </Modal>
      <View style={{ width: width, height: height }}>
        {/* 上层菜单 */}
        <TopMenu hidden={hiddenMenu} />
        {/* 弹出的菜单 */}
        <PopupMenu
          hidden={hiddenSetting}
          onChange={() => setHiddenFont(false)}
        />
        {/* 弹出的字体菜单 */}
        <FontSelect hidden={hiddenFont} />
        {/* 弹出更多设置 */}
        <MoreSetting hidden={hiddenMoreSetting} />
        {/* 菜单操作 */}
        <BottomMenu
          hidden={hiddenMenu}
          onChange={() => {
            setHiddenMenu(true);
            setHiddenSetting(false);
          }}
          onList={() => {
            setHiddenList(false);
            setHiddenMenu(true);
          }}
        />
        {/* 阅读内容 */}
        <Pressable
          onPress={(e) => {
            navigation.push("Modal");
            let centerWitdth = width / 2;
            let centerHeight = height / 2;
            let x = e.nativeEvent.locationX;
            let y = e.nativeEvent.locationY;

            if (
              x >= centerWitdth - 48 &&
              x <= centerWitdth + 48 &&
              y >= centerHeight - 48 &&
              y <= centerHeight + 48
            ) {
              console.log("center");
            }

            if (x < centerWitdth - 48) {
              console.log("prevPage");
            }

            if (x > centerWitdth + 48) {
              console.log("nextPage");
            }

            if (y < centerHeight - 48) {
              console.log("prevPage");
            }

            if (x < centerWitdth - 48 || x > centerWitdth + 48) {
              console.log("nextPage");
            }

            if (e.nativeEvent.locationX > width / 2)
              if (!hiddenFont) {
                setHiddenFont(true);
                return;
              }

            // 如果已弹出详细菜单
            if (!hiddenSetting || !hiddenFont) {
              setHiddenSetting(true);
              setHiddenFont(true);
              return;
            }
            setHiddenMenu(!hiddenMenu);
          }}
        >
          <NovelText textList={textList} />
        </Pressable>
      </View>
      <List hidden={hiddenList} />
    </Animated.View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: 2 * width,
    height: height,
    flexDirection: "row",
  },
});
