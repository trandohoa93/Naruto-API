import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async (pokemonName) => {
    const response = await fetch(`${API_BASE_URL}/pokemon/${pokemonName}`);
    const Pokemon = await response.json();
    return Pokemon;
  }
);

const initialState = {
  Pokemon: [],
  loading: "idle",
};

export const cardSlice = createSlice({
  name: "card",
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

export default cardSlice.reducer;
