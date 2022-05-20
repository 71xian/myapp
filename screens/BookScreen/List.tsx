import { setStatusBarHidden } from "expo-status-bar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getList } from "../../api/book";
import { Text, View } from "../../components/Themed";

interface Props {
  hidden: boolean;
}

interface menuItem {
  title: string;
  link: string;
}

const List = ({ hidden }: Props) => {
  const [hiddenMark, setHiddenMark] = useState(true);

  const [data, setData] = useState<menuItem[]>([]);

  const [id, setId] = useState("");

  const fadeAnimate = useRef(new Animated.Value(0)).current;

  const fadeEnter = () => {
    Animated.timing(fadeAnimate, {
      toValue: -width,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeLeave = () => {
    Animated.timing(fadeAnimate, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    getList("https://www.silukew.com/ny72811/").then((res) =>
      setData(res.data)
    );
  }, []);

  useEffect(() => {
    setStatusBarHidden(false, "fade");

    hiddenMark ? fadeLeave() : fadeEnter();

    return () => setStatusBarHidden(true, "fade");
  }, [hiddenMark]);

  return useMemo(
    () => (
      <View style={styles.container}>
        <View style={styles.title}>
          <TouchableOpacity>
            <Text
              style={[
                styles.titleText,
                hiddenMark ? { color: "red" } : undefined,
              ]}
              onPress={() => setHiddenMark(true)}
            >
              目录
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={[
                styles.titleText,
                hiddenMark ? undefined : { color: "red" },
              ]}
              onPress={() => setHiddenMark(false)}
            >
              书签
            </Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[
            styles.tabContainer,
            { transform: [{ translateX: fadeAnimate }] },
          ]}
        >
          <View style={styles.tab}>
            <FlatList
              renderToHardwareTextureAndroid={true}
              data={data}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => setId(item.link)}>
                    <View
                      style={{
                        height: 48,
                        paddingHorizontal: 16,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[
                          { color: "gray" },
                          id === item.link ? { color: "red" } : undefined,
                        ]}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.title}
              extraData={id}
            />
          </View>
          <View style={styles.tab}></View>
        </Animated.View>
      </View>
    ),
    [hidden, hiddenMark, id]
  );
};

const { width, height } = Dimensions.get("window");

const { currentHeight } = StatusBar;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    paddingTop: currentHeight,
  },
  title: {
    width: width,
    height: 48,
    backgroundColor: "gray",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  titleText: {
    color: "white",
    backgroundColor: "rgb(112,112,112)",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tabContainer: {
    width: 2 * width,
    flex: 1,
    flexDirection: "row",
  },
  tab: {
    width: width,
  },
});

export default List;
