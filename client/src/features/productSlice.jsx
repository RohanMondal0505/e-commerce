import { createSlice } from "@reduxjs/toolkit";

// appApi

const ProductSlice = createSlice({
	name: "products",
	initialState: [],
	reducers: {
		updateProducts: (_, action) => {
			return action.payload;
		},
	},
});

export const { updateProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
