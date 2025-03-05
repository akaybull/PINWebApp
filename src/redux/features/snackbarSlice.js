import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    notifications: [],
  },
  reducers: {
    enqueueSnackbar: (state, action) => {
      state.notifications.push({
        ...action.payload,
        key: new Date().getTime() + Math.random(),
      });
    },
    removeSnackbar: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.key !== action.payload
      );
    },
  },
});

export const { enqueueSnackbar, removeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
