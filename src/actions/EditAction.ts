import { createSlice } from "@reduxjs/toolkit";

const initialState = { userData: {} };

export const EditAction = createSlice({
  name: "editAction",
  initialState,
  reducers: {
    setEditVal: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setEditVal } = EditAction.actions;

export const getEditVal = (state: any) => state.editAction.userData;

export default EditAction.reducer;
