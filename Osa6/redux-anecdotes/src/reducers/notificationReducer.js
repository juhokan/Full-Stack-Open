import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    emptyMessage() {
      return '';
    }
  },
});

export const { setMessage, emptyMessage } = notificationSlice.actions;

export default notificationSlice.reducer;