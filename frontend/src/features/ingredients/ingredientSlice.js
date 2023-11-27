import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ingredientService from "./ingredientService";

const initialState = {
  ingredients: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new ingredient
export const createIngredient = createAsyncThunk(
  "ingredients/create",
  async (ingredientData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ingredientService.createIngredient(ingredientData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user ingredients
export const getIngredients = createAsyncThunk(
  "ingredients/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ingredientService.getIngredients(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user ingredient
export const deleteIngredient = createAsyncThunk(
  "ingredients/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ingredientService.deleteIngredient(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIngredient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIngredient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ingredients.push(action.payload);
      })
      .addCase(createIngredient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteIngredient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIngredient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ingredients = state.ingredients.filter(
          (ingredient) => ingredient._id !== action.payload.id
        );
      })
      .addCase(deleteIngredient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ingredientSlice.actions;
export default ingredientSlice.reducer;
