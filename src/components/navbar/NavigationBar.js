import React, { useContext } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { Link } from 'react-router-dom';
import { Container, Navbar, Button, Nav, Row, Col } from 'react-bootstrap';
import LoggedInLinks from './LoggedInLinks';

function NavigationBar() {
	const { isLoggedIn, currentUser } = useContext(GlobalContext);

	const renderLogins = () => {
		if (isLoggedIn) {
			return (
				<Row>
					<Col xs={12}>
						<Navbar.Text>
							Welcome <strong>{currentUser}</strong>!
						</Navbar.Text>
					</Col>
					<Col xs={12}>
						<Navbar.Text>
							<Button className='' variant='danger' as={Link} to='/login'>
								Sign Out
							</Button>
						</Navbar.Text>
					</Col>
				</Row>
			);
		}
		return (
			<Navbar.Text>
				<Button variant='success' as={Link} to='/login'>
					Sign In
				</Button>
			</Navbar.Text>
		);
	};

	return (
		<Navbar collapseOnSelect bg='dark' variant='dark' expand='sm'>
			<Container>
				<Navbar.Brand as={Link} to='/'>
					Weekly Meals
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='main-navbar' />
				<Navbar.Collapse id='main-navbar'>
					<Nav className='me-auto'>
						<Nav.Link as={Link} to='/'>
							Home
						</Nav.Link>
						{isLoggedIn && <LoggedInLinks />}
						{isLoggedIn ? (
							<Navbar.Text>
								{' '}
								Welcome <strong>{currentUser}</strong>!
							</Navbar.Text>
						) : (
							null
						)}
						{renderLogins()}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;
