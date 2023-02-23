import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useCreateProductMutation } from "../service/api";
import "../style/NewProduct.scss";

const NewProduct = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("");
	const [images, setImages] = useState([]);
	const [imgToRemove, setImgToRemove] = useState(null);
	const [createProduct, { isError, isLoading, isSuccess, error }] = useCreateProductMutation();

	const navigate = useNavigate();

	const showWidget = () => {
		let widget = window.cloudinary.createUploadWidget(
			{
				cloudName: "dgvjdbz39",
				uploadPreset: "pczzgcty",
			},
			(error, result) => {
				if (!error && result.event === "success") {
					setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
				}
			}
		);
		widget.open();
	};

	const handelRemove = (imageObj) => {
		setImgToRemove(imageObj.public_id);
		axios
			.delete(`/images/${imageObj.public_id}/`)
			.then((response) => {
				setImgToRemove(null);
				setImages((prev) => prev.filter((image) => image.public_id !== imageObj.public_id));
			})
			.catch((error) => console.log(error));
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		createProduct({
			name,
			description,
			price,
			category,
			images,
		})
			.then(({ data }) => {
				if (data.length > 0) {
					console.log(data);
					setTimeout(() => {
						navigate("/");
					}, 1500);
				}
			})
			.catch((error) => console.log(error));

		// setName("");
		// setDescription("");
		// setPrice("");
		// setCategory("");
		// setImage([]);
	};

	return (
		<>
			<Container>
				<Row>
					<Col md={6} className="new-product__from--container">
						<Form style={{ with: "100%", textAlign: "center" }} onSubmit={handleSubmit}>
							<h1 className="mt-4">Create Product</h1>
							{isError && <Alert variant="danger">{error.data}</Alert>}
							{isSuccess && <Alert variant="success">Product Created</Alert>}

							<Form.Group className="mb-3">
								<Form.Label>Product Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Product Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Product Description</Form.Label>
								<Form.Control
									as="textarea"
									placeholder="Product Description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									style={{ height: "100px" }}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Price {"$"}</Form.Label>
								<Form.Control
									type="number"
									placeholder="Price $"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
							</Form.Group>

							<Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
								<Form.Label>Category</Form.Label>
								<Form.Select defaultValue="">
									<option disabled value="">
										-- Select One --
									</option>
									<option value="technology">Technology</option>
									<option value="phone">Phone</option>
									<option value="laptop">Laptop</option>
								</Form.Select>
							</Form.Group>

							<Form.Group className="mb-3">
								<Button type="button" onClick={showWidget}>
									Upload Images
								</Button>
								<div className="image-preview-container ">
									{images.map((image, index) => (
										<div className="image-preview">
											<img src={image.url} alt="product image" />
											{imgToRemove != image.public_id && (
												<i class="fa-solid fa-circle-xmark" onClick={() => handelRemove(image)}></i>
											)}
										</div>
									))}
								</div>
							</Form.Group>

							<Form.Group className="mb-5">
								<Button type="submit" disabled={isLoading || isSuccess}>
									Add Product
								</Button>
							</Form.Group>
						</Form>
					</Col>
					<Col md={6} className="new-product__image--container"></Col>
				</Row>
			</Container>
		</>
	);
};

export default NewProduct;
