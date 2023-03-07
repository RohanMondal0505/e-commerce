import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import NewProduct from "./pages/NewProduct";
import ProductPage from "./pages/ProductPage";
import Signup from "./pages/Signup.jsx";

const App = () => {
	const user = useSelector((state) => state.user);

	return (
		<div className="App">
			<BrowserRouter>
				<ScrollToTop/>
				<Navigation />
				<Routes>
					<Route index element={<Home />} />
					{!user && (
						<>
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
						</>
					)}

					<Route path="/product/:id" element={<ProductPage />} />

					<Route path="/category/:category" element={<CategoryPage />} />

					<Route path="/new-product" element={<NewProduct />} />

					<Route path="*" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
