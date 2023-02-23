import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = "https://naruto-api.fly.dev/api/v1/characters/";

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async (id) => {
    const response = await fetch(`${API_BASE_URL}${id}`);
    const Pokemon = await response.json();
    return Pokemon;
  }
);

const initialState = {
  loading: true,
  Pokemon: [],
};

export const CardSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.Pokemon = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default CardSlice.reducer;
