import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: null,
  loading: null,
  error: false,
};

export const film = createSlice({
  name: "film",
  initialState,
  /*
  C'est ici que les réducers sont définis.
  Les reducers sont des fonctions qui décrivent comment l'état de l'application change en réponse à des actions
  reducers: {}
  */
  reducers: {
    FETCH_START: (draft) => {
      draft.loading = true;
    },
    FETCH_SUCCESS: (draft, action) => {
      draft.loading = false;
      draft.data = action.payload;

    },
    FETCH_FAILURE: (draft) => {
      draft.loading = false;
      draft.error = true;
    },
  },
});
export const { FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } = film.actions;
export default film.reducer;