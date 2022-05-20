import { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../../components/Themed";

const data = [
  { id: "1231", name: "good" },
  { id: "12312", name: "ddo" },
];

for (let i = 0; i < 100; i++) {
  data.push({
    id: i.toString(),
    name: "wudia",
  });
}

const FontSelect = ({ hidden }: { hidden: boolean }) => {
  const fadeAnimate = useRef(new Animated.Value(360)).current;

  const fadeEnter = () => {
    Animated.timing(fadeAnimate, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeLeave = () => {
    Animated.timing(fadeAnimate, {
      toValue: 360,
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
        style={[styles.container, { transform: [{ translateY: fadeAnimate }] }]}
      >
        <View style={styles.title}>
          <Text style={{ fontSize: 16 }}>更多字体</Text>
        </View>
        <FlatList
          style={{
            marginTop: 48,
          }}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={styles.item}>
                <Text>{item.name}</Text>
                <TouchableOpacity>
                  <Text style={styles.button}>使用</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </Animated.View>
    ),
    [hidden]
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    height: 360,
    width: width,
    zIndex: 120,
  },
  title: {
    width: width,
    height: 48,
    position: "absolute",
    zIndex: 10,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 60,
    elevation: 1,
  },
  button: {
    fontSize: 14,
    color: "white",
    backgroundColor: "red",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default FontSelect;
