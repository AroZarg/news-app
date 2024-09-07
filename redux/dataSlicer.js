import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'news',
  initialState: {
    data: {},
  },
  reducers: {
    setNews: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setNews } = dataSlice.actions;
export default dataSlice.reducer;