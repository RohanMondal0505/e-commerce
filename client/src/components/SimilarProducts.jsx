import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const SimilarProducts = ({ _id, category, name, pictures }) => {
	return (
		<LinkContainer to={`/product/${_id}`} className="last-product-link-container">
			<Card style={{ width: "100%", margin: "10px" }}>
				<Card.Img
					variant="top"
					src={pictures[0].url}
					className="product-preview-img"
					style={{ height: "150px", objectFit: "cover" }}
					onDragStart={(e) => e.preventDefault()}
				/>
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Badge bg="warning" text="dark">
						{category}
					</Badge>
				</Card.Body>
			</Card>
		</LinkContainer>
	);
};

export default SimilarProducts;
