import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileData: {}
};

export const ProfileAction = createSlice({
  name: "ProfileAction",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const { setProfile } = ProfileAction.actions;

export const getProfile = (state: any) => state.action.profileData;

export default ProfileAction.reducer;
