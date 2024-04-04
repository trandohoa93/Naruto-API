import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = "https://naruto-api.fly.dev/api/v1/characters";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    const response = await fetch(`${API_BASE_URL}`);
    const Pokemons = await response.json();
    return Pokemons;
  }
);

const initialState = {
  searchTerm: "",
  loading: true,
  Pokemons: [],
  filteredPokemons: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    selectInput: (state, action) => {
      state.filteredPokemons = state.Pokemons;
      if (action.payload !== "all") {
        state.filteredPokemons = state.Pokemons.filter((item) => {
          return item.info["Afiliação"] === action.payload;
        });
      }
    },
    searchItem: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.Pokemons = action.payload;
        state.filteredPokemons = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { searchItem, selectInput } = searchSlice.actions;

export default searchSlice.reducer;
