import { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";

const TopMenu = ({ hidden }: { hidden: boolean }) => {
  const fadeAnimate = useRef(new Animated.Value(-72)).current;

  const fadeEnter = () => {
    Animated.timing(fadeAnimate, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeLeave = () => {
    Animated.timing(fadeAnimate, {
      toValue: -72,
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
        <Text>Hello</Text>
      </Animated.View>
    ),
    [hidden]
  );
};

const { width } = Dimensions.get("window");

const { currentHeight } = StatusBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: "white",
    paddingTop: currentHeight,
    width: width,
    height: 48,
    top: 0,
  },
});

export default TopMenu;
