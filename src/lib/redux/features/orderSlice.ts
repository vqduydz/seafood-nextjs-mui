import { createSlice } from '@reduxjs/toolkit';

const order = createSlice({
  name: 'orderItems',
  initialState: { orderItems: [] },
  reducers: {
    setOrderItems: (state, action) => {
      state.orderItems = action.payload;
    },
  },
});
export const { setOrderItems } = order.actions;
const { reducer: orderItemsReducer } = order;
export { orderItemsReducer };
