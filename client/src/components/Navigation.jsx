import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/UserSlice";
import "../style/Navigation.scss";

const Navigation = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handelLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	return (
		<Navbar bg="light" expand="lg" style={{ position: "sticky", top: 0, boxShadow: "0 0 10px 3px rgba(0,0,0,0.5)", zIndex:99999999}}>
			<Container fluid className="mx-5">
				<LinkContainer to="/">
					<Navbar.Brand>Ecommerce</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="d-flex justify-content-between" style={{ width: "100%" }}>
						<div className="d-flex">
							<LinkContainer to="/">
								<Nav.Link>Home</Nav.Link>
							</LinkContainer>
							{/* if no user */}
							{!user && (
								<LinkContainer to="/login">
									<Nav.Link>Login</Nav.Link>
								</LinkContainer>
							)}
						</div>
						{/* if  user */}
						{user && (
							<NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
								{user.isAdmin && (
									<>
										<LinkContainer to="/dashboard">
											<NavDropdown.Item>Dashboard</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/new-product">
											<NavDropdown.Item>New Product</NavDropdown.Item>
										</LinkContainer>
									</>
								)}

								{!user.isAdmin && (
									<>
										<LinkContainer to="/cart">
											<NavDropdown.Item>Cart</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/orders">
											<NavDropdown.Item>My Orders</NavDropdown.Item>
										</LinkContainer>
									</>
								)}
								<NavDropdown.Divider />
								<Button variant="danger" onClick={handelLogout} className="logout-btn">
									Logout
								</Button>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
