import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "../service/api";

const initialState = [];

const UserSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: () => {
			return null;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(appApi.endpoints.signup.matchFulfilled, (_, { payload }) => payload);
		builder.addMatcher(appApi.endpoints.login.matchFulfilled, (_, { payload }) => payload);
		builder.addMatcher(appApi.endpoints.addToCart.matchFulfilled, (_, { payload }) => payload);
		builder.addMatcher(appApi.endpoints.removeFromCart.matchFulfilled, (_, { payload }) => payload);
		builder.addMatcher(appApi.endpoints.increaseCartProduct.matchFulfilled, (_, { payload }) => payload);
		builder.addMatcher(appApi.endpoints.decreaseCartProduct.matchFulfilled, (_, { payload }) => payload);
	},
});

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;
