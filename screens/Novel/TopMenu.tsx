import { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import Layout from "../../constants/Layout";

const { width, barHeight } = Layout.window;

const TopMenu = ({ hidden }: { hidden: boolean }) => {
  const fadeAnimate = useRef(new Animated.Value(-72)).current;

  const fadeEnter = () => {
    Animated.timing(fadeAnimate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeLeave = () => {
    Animated.timing(fadeAnimate, {
      toValue: -72,
      duration: 300,
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
        <Text>Hello</Text>
      </Animated.View>
    ),
    [hidden]
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: "white",
    paddingTop: barHeight,
    width: width,
    height: 72,
    top: 0,
  },
});

export default TopMenu;
