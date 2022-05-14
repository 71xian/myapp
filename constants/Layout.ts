import { Dimensions, StatusBar } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const scale = Dimensions.get("window").scale;
const barHeight = StatusBar.currentHeight;

export default {
  window: {
    width,
    height,
    scale,
    barHeight,
  },
  isSmallDevice: width < 375,
};
