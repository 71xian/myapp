import { setStatusBarHidden } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Animated, BackHandler, Pressable, ToastAndroid } from "react-native";
import { View } from "../../components/Themed";
import Layout from "../../constants/Layout";
import { RootStackScreenProps } from "../../types";
import BottomMenu from "./BottomMenu";
import NovelText from "./NovelText";
import PopupMenu from "./PopupMenu";
import TopMenu from "./TopMenu";

const { width } = Layout.window;

const themes: number[] = [];

const textList = [
  "他估摸着这技能要是升级了，就能扩大传送范围，缩短冷却时间。",
  "他也没法咨询这个狗系统，毕竟问一次问题就是500分。",
  "他也没法咨询这个狗系统，毕竟问一次问题就是500分。",
  "他也没法咨询这个狗系统，毕竟问一次问题就是500分。",
  "他也没法咨询这个狗系统，毕竟问一次问题就是500分。",
  "他也没法咨询这个狗系统，毕竟问一次问题就是500分。",
  "他也没法咨询这个狗系统，毕竟问一次问题就是500分。",
  "他也没法咨询这个狗系统，毕竟问一次问题就是500分。",
  "他也没法咨询这个狗系统，毕竟问一次问题就是500分。",
  "他也没法咨询这个狗系统，毕竟问一次问题就是500分。",
  "他也没法咨询这个狗系统，毕竟问一次问题就是500分。",
  "他也没法咨询这个狗系统，毕竟问一次问题就是500分。",
];

for (let i = 0; i < 10; i++) {
  themes.push(i);
}

export default function NovelScreen({
  navigation,
}: RootStackScreenProps<"Novel">) {
  const [hidden, setHidden] = useState(true);
  const [hiddenSetting, setHiddenSetting] = useState(true);
  const [hiddenFont, setHiddenFont] = useState(true);

  useEffect(() => {
    setStatusBarHidden(true, "fade");
    const backAction = () => {
      if (hidden && hiddenSetting) {
        return false;
      }
      setHiddenSetting(true);
      setHidden(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setStatusBarHidden(hidden, "fade");
  }, [hidden]);

  return (
    <View>
      {/* 上层菜单 */}
      <TopMenu hidden={hidden} />
      {/* 弹出的菜单 */}
      <PopupMenu hidden={hiddenSetting} />
      {/* 弹出的字体菜单 */}
      <Animated.View
        style={[
          {
            position: "absolute",
            height: 300,
            width: width,
            backgroundColor: "white",
          },
        ]}
      ></Animated.View>
      {/* 菜单操作 */}
      <BottomMenu
        hidden={hidden}
        onChange={() => {
          setHidden(true);
          setHiddenSetting(false);
        }}
      />
      {/* 阅读内容 */}
      <Pressable
        onPress={() => {
          // 如果已弹出详细菜单
          if (!hiddenSetting) {
            setHiddenSetting(true);
            return;
          }
          setHidden(!hidden);
        }}
      >
        <NovelText textList={textList} />
      </Pressable>
    </View>
  );
}
