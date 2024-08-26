import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tgUserId: "",
};

export const TgUserAction = createSlice({
  name: "TgUserAction",
  initialState,
  reducers: {
    setTgUserId: (state, action) => {
      state.tgUserId = action.payload;
    },
  },
});

export const { setTgUserId } = TgUserAction.actions;

export const getTgUserId = (state: any) => state.action.tgUserId;

export default TgUserAction.reducer;
