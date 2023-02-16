import { createSlice } from "@reduxjs/toolkit";

// appApi
import  appApi  from "../service/api";

const ProductSlice = createSlice({
	name: "products",
	initialState: [],
	reducers: {	},
});

export const {  } = ProductSlice.actions;
export default ProductSlice.reducer;
