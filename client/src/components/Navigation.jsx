import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../assets/connected.png';

const Navigation = () => {
	const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

	return (
		<Navbar fixed="top" expand="xl" bg="light">
			<Container>
				<Navbar.Brand
					style={{ fontWeight: 'bold', color: '#000766' }}
					href="#home"
				>
					<Image src={logo} width="50" height="50" alt="TEAM CONNECTED logo" />{' '}
					CONNECTED
				</Navbar.Brand>
				&emsp;&emsp;&emsp;&emsp;
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse fill className="justify-content-center">
					<Nav fill>
						<Nav.Link href="#home">&emsp;HOME&emsp;</Nav.Link>
						<Nav.Link href="/create-survey">&emsp;SURVEY&emsp;</Nav.Link>
						<Nav.Link href="#link">&emsp;ABOUT&emsp;</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<Navbar.Collapse className="justify-content-end">
					{!isAuthenticated && (
						<Nav fill>
							<Nav.Link
								style={{ fontWeight: 'bold', color: '#000766' }}
								onClick={() => loginWithRedirect()}
							>
								LOG IN
							</Nav.Link>
						</Nav>
					)}
					{isAuthenticated && (
						<>
							<Nav fill>
								<Nav.Item>
									<Nav.Link>
										<Image
											src={user.picture}
											width="50"
											height="50"
											alt="ProfilePic"
											roundedCircle
										/>
										{'  '}
										{user.name}
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										style={{ fontWeight: 'bold', color: '#000766' }}
										onClick={() => logout({ returnTo: window.location.origin })}
									>
										LOG OUT
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
