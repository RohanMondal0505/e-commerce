import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import UserSlice from "./features/UserSlice";
import appApi from "./service/api";

// persist our store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";


// reducer
const reducer = combineReducers({
	user: UserSlice,
	products: productSlice,
	[appApi.reducerPath]: appApi.reducer,
});


const persistConfig = {
    key: "root",
    storage,
    blackList: [appApi.reducerPath, "products"],
};


// persist our store
const persistedReducer = persistReducer(persistConfig, reducer);


// create the store
const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk, appApi.middleware],
});

export default store;