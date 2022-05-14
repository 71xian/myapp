import React, { useMemo } from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";
import Layout from "../../constants/Layout";
import useSelector from "../../hooks/useSelector";
import { selectFontSize } from "../../store/feature/app/appSlice";
import BottomText from "./BottomText";

const { width, height } = Layout.window;

interface TextProps {
  textList: string[];
  source?: any;
}

const NovelText = ({ textList, source }: TextProps) => {
  const fontSize = useSelector(selectFontSize);

  return useMemo(
    () => (
      <ImageBackground
        style={styles.container}
        source={require("../../assets/images/background.png")}
        imageStyle={{ resizeMode: "repeat" }}
      >
        <Text style={styles.firstText}>章节名</Text>
        {textList.map((text, index) => {
          return (
            <Text
              style={[
                {
                  fontSize: fontSize,
                  lineHeight: fontSize * 1.5,
                  paddingVertical: 16,
                },
              ]}
              key={index}
            >
              &emsp;&emsp; {text}
            </Text>
          );
        })}
        <BottomText />
      </ImageBackground>
    ),
    [textList, source, fontSize]
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    paddingHorizontal: 16,
  },
  firstText: {
    color: "grey",
    fontSize: 12,
    marginVertical: 12,
  },
});

export default NovelText;
