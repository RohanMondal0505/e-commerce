import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/Signup.scss";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handelSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<Container>
			<Row>
				<Col md={6} className="signup__form--container">
					<Form style={{ width: "100%", textAlign: "center" }}>
						<h1>Create a account</h1>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								require
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								require
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								require
							/>
						</Form.Group>

						<Form.Group>
							<Button type="submit">Login</Button>
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
