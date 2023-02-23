import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../axios";
import Loading from "../components/Loading";
import SimilarProducts from "../components/SimilarProducts";

const ProductPage = () => {
	const { id } = useParams();
	const user = useSelector((state) => state.user);
	const [product, setProduct] = useState(null);
	const [similar, setSimilar] = useState(null);

	const handelDragStart = (e) => e.preventDefault();
	useEffect(() => {
		axios.get(`/product/${id}`).then(({ data }) => {
			setProduct(data.product);
			setSimilar(data.similar);
		});
	}, [id]);

	const images = product.pictures.map((picture) => (
		<img src={picture.url} alt={picture.alt} className="product__carousel--image" onDragStart={handelDragStart} />
    ));
    
	if (!product) {
		return <Loading/>;
    }
    
    let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className="item" data-value={idx}>
                <SimilarProducts/>
            </div>
        ))
    }

	return (
		<Container className="pt-4" style={{ position: "relative" }}>
			<Row>
				<Col lg={6}>
					<AliceCarousel mouseTracking items={images} controlsStrategy="alternative" />
				</Col>
			</Row>
		</Container>
	);
};

export default ProductPage;
