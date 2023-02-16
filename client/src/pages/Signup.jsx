import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../service/api";
import "../style/Signup.scss";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signup, { error, isLoading, isError }] = useSignupMutation();

	const navigate = useNavigate();

	const handelSignup = async (e) => {
		e.preventDefault();
		let s = await signup({ name, email, password });
		if (s.data) return navigate("/");
	};

	return (
		<Container>
			<Row>
				<Col md={6} className="signup__form--container">
					<Form style={{ width: "100%", textAlign: "center" }} onSubmit={handelSignup}>
						<h1>Create a account</h1>
						{isError && <Alert variant="danger">{error.data}</Alert>}
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required={true}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required={true}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required={true}
							/>
						</Form.Group>

						<Form.Group>
							<Button type="submit" disabled={isLoading}>
								Create account
							</Button>
						</Form.Group>
						<p>
							Already have an account? <Link to="/login">Login</Link>
						</p>
					</Form>
				</Col>
				<Col mb={6} className="signup__image--container"></Col>
			</Row>
		</Container>
	);
};

export default Signup;
