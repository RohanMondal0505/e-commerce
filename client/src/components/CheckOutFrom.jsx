import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../service/api";

const CheckOutFrom = ({ paying, setPaying }) => {
	const stripe = useStripe();
	const elements = useElements();
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const [alertMessage, setAlertMessage] = useState();
	const [createOrder, { isLoading, isError }] = useCreateOrderMutation();
	const [country, setCountry] = useState("");
	const [address, setAddress] = useState("");

	const handelPay = async (e) => {
		if (!stripe || !elements || !user.cart.count <= 0) return;
		setPaying(true);
		const { client_secret } = await fetch("http://localhost:8080/create-payment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ amount: user.cart.total }),
		}).then((res) => res.json());
		const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: elements.getElement(CardElement),
			},
        });
        setPaying(false);


        if (paymentIntent) {
            createOrder({ userId: user._id, cart: user.cart, address, country }).then(res => {
                if (!isLoading && !isError) {
                    setAlertMessage(`Payment ${paymentIntent.status}`);
                    setTimeout(() => {
                        navigate("/orders");
                    }, 2000)
                }
            })
        }
	};
	return (
		<Col md={7} className="cart-payment-container">
			<Form onSubmit={handelPay}>
				<Row>
					{alertMessage && <Alert>{alertMessage}</Alert>}
					<Col md={6}>
						<Form.Group>
							<Form.Label>First Name</Form.Label>
							<Form.Control type="text" placeholder="First Name" value={user.name} disabled />
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="User Email" value={user.email} disabled />
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={7}>
						<Form.Group>
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								placeholder="Address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col md={5}>
						<Form.Group>
							<Form.Label>Country</Form.Label>
							<Form.Control
								type="text"
								placeholder="Country"
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<label htmlFor="card-element">Card</label>
				<CardElement id="card-element" />
				<Button className="mt-3" type="submit" disabled={user.cart.count <= 0 || paying}>
					{paying ? "Processing..." : "Pay"}
				</Button>
			</Form>
		</Col>
	);
};

export default CheckOutFrom;
