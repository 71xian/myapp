import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  useSystemBrightnessAsync,
  setBrightnessAsync,
  requestPermissionsAsync,
} from "expo-brightness";
import { RootState } from "../..";

interface BookState {
  fontSize: number;
  system: boolean;
  brightness: number;
  theme?: any;
}

const initialState: BookState = {
  fontSize: 16,
  system: true,
  brightness: 1,
};

const { setItem } = AsyncStorage;

export const bookSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFontsize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
      setItem("fontSize", String(action.payload));
    },
    setSystem: (state, action: PayloadAction<boolean>) => {
      state.system = action.payload;
      state.system
        ? useSystemBrightnessAsync()
        : setBrightnessAsync(state.brightness);
      setItem("system", String(action.payload));
    },
    setBrightness: (state, action: PayloadAction<number>) => {
      state.brightness = action.payload;
      if (!state.system) {
        requestPermissionsAsync().then(({ status }) => {
          if (status === "granted") {
            setBrightnessAsync(state.brightness);
          }
        });
      }
      setItem("brightness", String(action.payload));
    },
  },
});

export const { setFontsize, setSystem, setBrightness } = bookSlice.actions;

export const selectFontSize = (state: RootState) => state.book.fontSize;

export const selectSystem = (state: RootState) => state.book.system;

export const selectBrightness = (state: RootState) => state.book.brightness;

export const selectTheme = (state: RootState) => state.book.theme;

export default bookSlice.reducer;
