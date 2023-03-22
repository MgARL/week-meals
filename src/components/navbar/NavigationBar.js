import React, { useContext } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import NotLoggedInNav from './NotLoggedInNav';
import LoggedInNav from './LoggedInNav';

function NavigationBar() {
	const { isLoggedIn, currentUser } = useContext(GlobalContext);

	return (
		<Navbar collapseOnSelect bg='dark' variant='dark' expand='sm' sticky='top'>
			<Container>
				<Navbar.Brand as={Link} to='/'>
					Weekly Meals
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='main-navbar' />
				<Navbar.Collapse id='main-navbar'>
					<Nav className='ms-auto'>
						{isLoggedIn ? <LoggedInNav currentUser={currentUser}/> : <NotLoggedInNav/>}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;
