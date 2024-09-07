import { configureStore } from '@reduxjs/toolkit'
import dataSlicer from './dataSlicer';

export const store = configureStore({
    reducer: {
      news:dataSlicer
    },
  });
  
  export default store;