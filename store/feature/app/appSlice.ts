import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

interface AppState {
  hidden: boolean;
}

const initialState: AppState = {
  hidden: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setHidden(state, action: PayloadAction<boolean>) {
      state.hidden = action.payload;
    },
  },
});

export const { setHidden } = appSlice.actions;

export const selectHidden = (state: RootState) => state.app.hidden;

export default appSlice.reducer;
