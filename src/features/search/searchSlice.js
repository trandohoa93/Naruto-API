import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = "https://naruto-api.fly.dev/api/v1/characters";

export const fetchListPokemon = createAsyncThunk(
  "pokemon/fetchListPokemon",
  async () => {
    const response = await fetch(`${API_BASE_URL}`);
    const ListPokemons = await response.json();
    return ListPokemons;
  }
);

const initialState = {
  searchTerm: "",
  loading: true,
  ListPokemons: [],
  filteredPokemons: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchItem: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListPokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchListPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.ListPokemons = action.payload;
        state.filteredPokemons = action.payload;
      })
      .addCase(fetchListPokemon.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { searchItem } = searchSlice.actions;

export default searchSlice.reducer;
