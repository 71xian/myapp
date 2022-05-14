import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./feature/app/appSlice";
import userSlice from "./feature/user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    app: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
