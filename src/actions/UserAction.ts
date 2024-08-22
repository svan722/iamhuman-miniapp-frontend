import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  limitacnt: "",
};

export const UserAction = createSlice({
  name: "UserAction",
  initialState,
  reducers: {
    setLimitAcntVal: (state, action) => {
      state.limitacnt = action.payload;
    },
  },
});

export const { setLimitAcntVal } = UserAction.actions;

export const getLimitAcntVal = (state: any) => state.action.limitacnt;

export default UserAction.reducer;
