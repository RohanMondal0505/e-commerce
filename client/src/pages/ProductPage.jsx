import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Badge, Button, ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../axios";
import Loading from "../components/Loading";
import SimilarProducts from "../components/SimilarProducts";
import { ToastMessage } from "../components/ToastMessage";
import { useAddToCartMutation } from "../service/api";
import "../style/ProductPage.scss";

const ProductPage = () => {
	const { id } = useParams();
	const user = useSelector((state) => state.user);
	const [product, setProduct] = useState(null);
	const [similar, setSimilar] = useState(null);
	const [addToCart, { isSuccess }] = useAddToCartMutation();

	const handelDragStart = (e) => e.preventDefault();

	useEffect(() => {
		axios.get(`/products/${id}`).then(({ data }) => {
			setProduct(data.product);
			setSimilar(data.similar);
		});
	}, [id]);

	if (!product) {
		return <Loading />;
	}

	const responsive = {
		0: { items: 1 },
		568: { items: 2 },
		1024: { items: 3 },
	};

	const images = product.pictures.map((picture) => (
		<img src={picture.url} alt={picture.alt} className="product__carousel--image" onDragStart={handelDragStart} />
	));

	let similarProducts = [];
	if (similar) {
		similarProducts = similar.map((product, idx) => (
			<div className="item" data-value={idx}>
				<SimilarProducts {...product} />
			</div>
		));
	}

	return (
		<Container className="pt-4" style={{ position: "relative" }}>
			<Row>
				<Col lg={6}>
					<AliceCarousel mouseTracking items={images} controlsStrategy="alternative" />
				</Col>
				<Col lg={6} className="pt-4 ps-5 text-center">
					<h1>{product.name}</h1>
					<p>
						<Badge bg="primary">{product.category}</Badge>
					</p>
					<p className="product_price">${product.price}</p>
					<p style={{ textAlign: "justify" }} className="py-3">
						<strong>Description:</strong> {product.description}
					</p>
					{user && !user.isAdmin && (
						<ButtonGroup style={{ width: "100%" }}>
							<Form.Select size="lg" style={{ width: "40%", borderRadius: "0" }}>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</Form.Select>
							<Button
								size="lg"
								disabled={!user}
								onClick={() =>
									addToCart({
										userId: user._id,
										productId: id,
										price: product.price,
										image: product.pictures[0].url,
									})
								}>
								Add to cart
							</Button>
						</ButtonGroup>
					)}
					{user && user.isAdmin && (
						<LinkContainer to={`/product/${product._id}/edit`}>
							<Button size="lg">Edit Product</Button>
						</LinkContainer>
					)}
					{isSuccess && <ToastMessage title="Added to cart" bg="info" body={`${product.name} is in your cart`} />}
				</Col>
			</Row>
			<div className="my-4">
				<h2>Similar Products</h2>
				<div className="d-flex justify-content-center align-items-center flex-wrap">
					<AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternative" />
				</div>
			</div>
		</Container>
	);
};

export default ProductPage;
