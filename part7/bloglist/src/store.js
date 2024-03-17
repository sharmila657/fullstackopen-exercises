import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogreducer from "./reducers/blogreducer";
import userReducer from "./reducers/userReducer";
const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs:blogreducer,
    user:userReducer
  },
});

export default store;