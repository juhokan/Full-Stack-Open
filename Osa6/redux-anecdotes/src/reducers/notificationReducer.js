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

export const setNotification = (message, length) => {
  return async dispatch => {
    const time = length * 1000
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(emptyMessage());
    }, time);
  }
}

export default notificationSlice.reducer;