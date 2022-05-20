import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import Confirm from "./components/Confirm";
import Overlay from "./components/Overlay";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import store from "./store";

function AppWrapper() {
  return (
    <Provider store={store}>
      {/* 
      redux必须放在这里
      useDispatch 必须处于定义store的组件的 子组件中才可以使用
      */}
      <App />
    </Provider>
  );
}

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <Overlay />
      <Confirm />
      <StatusBar animated={true} />
    </SafeAreaProvider>
  );
}

export default AppWrapper;
