import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  token: string;
}

const initialState: UserState = {
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
