import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import ingredientReducer from "../features/ingredients/ingredientSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ingredients: ingredientReducer,
  },
});
