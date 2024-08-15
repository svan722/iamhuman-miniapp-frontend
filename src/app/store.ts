import { configureStore } from "@reduxjs/toolkit";
import otpAction from "../actions/OtpAction";
import editAction from "../actions/EditAction";

export const store = configureStore({
  reducer: {
    action: otpAction,
    editAction: editAction,
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
