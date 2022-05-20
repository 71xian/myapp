import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./feature/app/appSlice";
import bookSlice from "./feature/book/bookSlice";
import userSlice from "./feature/user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    app: appSlice,
    book: bookSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
