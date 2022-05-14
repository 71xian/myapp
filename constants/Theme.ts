import { ColorValue, ImageResizeMode } from "react-native";

interface ThemeItem {
  source: any;
  resizeMode: ImageResizeMode;
  color?: ColorValue;
}

const theme: ThemeItem = {
  source: require("../assets/images/background.png"),
  resizeMode: "repeat",
};

const theme1: ThemeItem = {
  source: require("../assets/images/background1.png"),
  resizeMode: "repeat",
};

const theme2: ThemeItem = {
  source: require("../assets/images/background2.png"),
  resizeMode: "repeat",
};

const theme3: ThemeItem = {
  source: require("../assets/images/background3.jpg"),
  resizeMode: "stretch",
};

const theme4: ThemeItem = {
  source: require("../assets/images/background4.jpg"),
  resizeMode: "stretch",
};

const theme5: ThemeItem = {
  source: require("../assets/images/background5.jpg"),
  resizeMode: "stretch",
};

const theme6: ThemeItem = {
  source: require("../assets/images/background6.jpg"),
  resizeMode: "stretch",
};

const theme7: ThemeItem = {
  source: require("../assets/images/background7.jpg"),
  resizeMode: "stretch",
};

const theme8: ThemeItem = {
  source: require("../assets/images/background8.jpg"),
  resizeMode: "stretch",
};

export default {
  theme,
  theme1,
  theme2,
  theme3,
  theme4,
  theme5,
  theme6,
  theme7,
  theme8,
};
