import { configureStore } from '@reduxjs/toolkit';
import otpAction from '../actions/OtpAction';

export const store = configureStore({
  reducer: {
    action: otpAction
  },
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;