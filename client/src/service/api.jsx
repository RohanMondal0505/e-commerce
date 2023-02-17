import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// create api

export const appApi = createApi({
	reducerPath: "appApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
	endpoints: (builder) => ({
		signup: builder.mutation({
			query: (user) => ({
				url: "/user/signup",
				method: "POST",
				body: user,
			}),
		}),

		login: builder.mutation({
			query: (user) => ({
				url: "/user/login",
				method: "POST",
				body: user,
			}),
		}),

		//create product
		createProduct: builder.mutation({
			query: (product) => ({
				url: "/products",
				method: "POST",
				body: product,
			}),
		}),
	}),
});

export const { useSignupMutation, useLoginMutation, useCreateProductMutation } = appApi;

export default appApi;
