import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadAsync } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useEffect, useState } from "react";
import { setFontsize, setSystem, setBrightness } from "../store/feature/book/bookSlice";

import useDispatch from "./useDispatch";

const { getItem } = AsyncStorage;

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const dispatch = useDispatch();

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        preventAutoHideAsync();

        // Load fonts
        await loadAsync({
          ...AntDesign.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          "harmony-sans": require("../assets/fonts/HarmonyOS_Sans_Regular.ttf"),
          "noto-sans": require("../assets/fonts/NotoSansSC-Regular.otf"),
        });

        let fontSize = await getItem("fontSize");

        let system = await getItem("system");

        let brightness = await getItem("brightness");

        fontSize === null
          ? dispatch(setFontsize(16))
          : dispatch(setFontsize(Number(fontSize)));

        system === null
          ? dispatch(setSystem(true))
          : dispatch(setSystem(Boolean(system)));

        brightness === null
          ? dispatch(setBrightness(1))
          : dispatch(setBrightness(Number(brightness)));
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
