import React, { useContext } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function NavigationBar() {
  const { isLoggedIn, currentUser } = useContext(GlobalContext);

  const renderLogins = () => {
    if (isLoggedIn) {
      return (
        <Navbar.Text>
          Signed in as: <strong>{currentUser}</strong>
        </Navbar.Text>
      );
    }
    return (
      <Button variant='success' as={Link} to='/login'>
        Sign In
      </Button>
    );
  };

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Weekly Meals
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>{renderLogins()}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
