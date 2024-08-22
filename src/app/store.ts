import { configureStore } from "@reduxjs/toolkit";
import otpAction from "../actions/OtpAction";
import editAction from "../actions/EditAction";
import userAction from "../actions/UserAction";

export const store = configureStore({
  reducer: {
    action: otpAction,
    editAction: editAction,
    userAction: userAction,
  },
  devTools: true,
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
