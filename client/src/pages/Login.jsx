import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../service/api";
import "../style/Signup.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login, { isError, isLoading, error }] = useLoginMutation();

	const navigate = useNavigate();

	const handelLogin = async (e) => {
		e.preventDefault();
		let l = await login({ email, password });
		if (l.data) return navigate("/");
	};
	return (
		<Container>
			<Row>
				<Col md={6} className="login__form--container">
					<Form style={{ with: "100%", textAlign: "center" }} onSubmit={handelLogin}>
						<h1>Login to your account</h1>
						{isError && <Alert variant="danger">{error.data}</Alert>}
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
								Login
							</Button>
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
