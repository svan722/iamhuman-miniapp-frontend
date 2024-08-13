import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  otp: '',
};


export const OtpAction = createSlice({
  name: 'OtpAction',
  initialState,
  reducers: {
    setOtpVal: (state, action) => {
      state.otp = action.payload;
    },
  },
  
});

export const { setOtpVal } = OtpAction.actions;

export const getOtpVal = (state:any) => state.action.otp;

export default OtpAction.reducer;