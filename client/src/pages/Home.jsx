import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import axios from "../axios";
import categories from "../Categories";
import ProductPreview from "../components/ProductPreview";
import { updateProducts } from "../features/productSlice";
import "../style/Home.scss";

const Home = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const lastProducts = products.slice(0, 8);

	useEffect(() => {
		axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
	}, []);

	return (
		<>
			<div className="Home d-flex flex-column align-items-center">
				<img
					src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png"
					className="home-banner"
				/>
				<div className="featured-products-container container mt-4 text-center">
					<h2>Latest products</h2>
					{/* last products here */}
					<div className="d-flex justify-content-center flex-wrap">
						{lastProducts.map((product) => (
							<ProductPreview {...product} key={product._id} />
						))}
					</div>
					<div>
						<Link
							to="/category/all"
							style={{
								textAlign: "right",
								display: "block",
							}}>
							See more {">>"}{" "}
						</Link>
					</div>
				</div>
				{/* sale product */}
				<div className="sale__banner--container mt-4">
					<img
						src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png"
						alt="sale banner"
					/>
				</div>
				<div className="recent-products-container container mt-4 text-center">
					<h2>Categories</h2>
					<Row>
						{categories.map((category, index) => (
							<LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`} key={index}>
								<Col md={4}>
									<div
										style={{
											backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)) ,url(${category.img})`,
											gap: "10px",
											boxShadow: "5px 5px 5px 2px rgba(0,0,0,0.4)",
										}}
										className="category-tile">
										{category.name}
									</div>
								</Col>
							</LinkContainer>
						))}
					</Row>
				</div>
			</div>
		</>
	);
};

export default Home;
