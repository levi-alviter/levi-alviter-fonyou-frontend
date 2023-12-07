import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characterId: null,
};

const characterSlice = createSlice({
  name: "characterSlice",
  initialState,
  reducers: {
    setCharacterId(state, action) {
      state.characterId = action.payload.characterId;
    },
    removeCharacterId(state) {
      state.characterId = null;
    }
  },
});

export const characterActions = characterSlice.actions;
export default characterSlice;