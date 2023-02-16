import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/Signup.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handelSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<Container>
			<Row>
				<Col md={6} className="login__form--container">
					<Form style={{ with: "100%", textAlign: "center" }}>
						<h1>Login to your account</h1>
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
							<Button type="submit">Login</Button>
						</Form.Group>
						<p>
							Don't have an account? <Link to="/signup">Create account</Link>
						</p>
					</Form>
				</Col>
				<Col mb={6} className="login__image--container"></Col>
			</Row>
		</Container>
	);
};

export default Login;
