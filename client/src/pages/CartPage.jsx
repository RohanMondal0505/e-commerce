import React from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../style/CartPage.scss";

const CartPage = () => {
	const user = useSelector((state) => state.user);
	const products = useSelector((state) => state.products);
	const userCartObj = user.cart;
	let cart = products.filter((product) => userCartObj[product._id] != null);

	return (
		<Container style={{ minHeight: "95vh" }} className="cart-container">
			<Row>
				<Col md={7}>
					<h1 className="pb-3 h3">Shopping Cart</h1>
					{cart.length == 0 ? (
						<Alert variant="info">Your cart is empty. Add product to your cart</Alert>
					) : (
						<div>Payment Here</div>
					)}
				</Col>
				<Col md={5}>
					{cart.length > 0 && (
						<>
							<Table responsive="sm" className="cart-table">
								<thead>
									<tr>
										<th>&nbsp;</th>
										<th>Product</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Subtotal</th>
									</tr>
								</thead>
								<tbody>
									{/* loop through */}
									{cart.map((item) => (
										<tr key={item._id}>
											<td>&nbsp;</td>
											<td>
												<i className="fa fa-times" style={{ marginRight: 10, cursor: "pointer" }}></i>
												<img
													src={item.pictures[0].url}
													alt="image"
													style={{ width: 70, height: 70, objectFit: "cover" }}
												/>
											</td>
											<td>${item.price}</td>
											<td>
												<span className="quantity-indicator">
													<i className="fa fa-minus-circle"></i>
													<span>{user.cart[item._id]}</span>
													<i className="fa fa-plus-circle"></i>
												</span>
											</td>
											<td>${item.price * user.cart[item._id]}</td>
										</tr>
									))}
								</tbody>
							</Table>
							<div>
								<h3 className="h4 pt-4">Total: ${user.cart.total}</h3>
							</div>
						</>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default CartPage;
