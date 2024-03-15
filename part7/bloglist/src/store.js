import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogreducer from "./reducers/blogreducer";
const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs:blogreducer
  },
});

export default store;