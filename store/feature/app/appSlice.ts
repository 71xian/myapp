import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

interface AppState {
  visible: boolean;
}

const initialState: AppState = {
  visible: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setVisible(state, action: PayloadAction<boolean>) {
      state.visible = action.payload;
    },
  },
});

export const { setVisible } = appSlice.actions;

export const selectVisible = (state: RootState) => state.app.visible;

export default appSlice.reducer;
