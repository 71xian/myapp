import {
  addBatteryLevelListener,
  getBatteryLevelAsync,
  Subscription,
} from "expo-battery";
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import Layout from "../../constants/Layout";

const { width } = Layout.window;

const BottomText = () => {
  const subscription = useRef<Subscription>();

  const interval = useRef<NodeJS.Timer | null>();

  const [batteryLevel, setBatteryLevel] = useState(0);

  const [hour, setHour] = useState(0);

  const [minute, setMinute] = useState(0);

  function getDate() {
    let date = new Date();
    setHour(date.getHours());
    setMinute(date.getMinutes());
  }

  useEffect(() => {
    // 初始化电量
    getBatteryLevelAsync().then((res) => {
      setBatteryLevel(Math.floor(res * 100));
    });

    // 初始化时间
    getDate();

    // 添加手机电量变化监听事件
    subscription.current = addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(Math.floor(batteryLevel * 100));
    });

    // 添加时间变化监听事件
    interval.current = setInterval(() => {
      getDate();
    }, 1000 * 5);

    return () => {
      subscription.current?.remove();
      clearInterval(Number(interval.current));
    };
  }, []);

  return useMemo(
    () => (
      <View style={styles.container}>
        <Text style={styles.text}>
          {hour}:{minute < 10 ? "0" + minute : minute}
        </Text>
        <Text style={styles.text}>新的世界 新的征程</Text>
        <Text style={styles.text}>{batteryLevel}%</Text>
      </View>
    ),
    [hour, minute, batteryLevel]
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: width,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  text: {
    color: "grey",
    fontSize: 12,
  },
});

export default BottomText;
