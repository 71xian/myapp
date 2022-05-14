import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

interface AppState {
  fontSize: number;
  system: boolean;
  brightness: number;
}

const initialState: AppState = {
  fontSize: 0,
  system: true,
  brightness: 1,
};

const { setItem } = AsyncStorage;

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFontsize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
      setItem("fontSize", String(action.payload));
    },
    setSystem: (state, action: PayloadAction<boolean>) => {
      state.system = action.payload;
      setItem("system", String(action.payload));
    },
    setBrightness: (state, action: PayloadAction<number>) => {
      state.brightness = action.payload;
      setItem("brightness", String(action.payload));
    },
  },
});

export const { setFontsize, setSystem, setBrightness } = appSlice.actions;

export const selectFontSize = (state: RootState) => state.app.fontSize;

export const selectSystem = (state: RootState) => state.app.system;

export const selectBrightness = (state: RootState) => state.app.brightness;

export default appSlice.reducer;
