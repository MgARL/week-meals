import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const renderLogins = () => {
    if(isLoggedIn){
      return(
        <Navbar.Text>
            Signed in as: <a href="#login">Current Guest(TBD)</a>
        </Navbar.Text>
      );
    }
    return(
      <Button variant="success" onClick={handleLoginButton}>
            Sign In
      </Button>
    );
  };

  const handleLoginButton = () => {
    if (isLoggedIn) {
      return setIsLoggedIn(false);
    };
    setIsLoggedIn(true);
  };
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
      <Navbar.Brand href="#home">Weekly Meals</Navbar.Brand>
      <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {renderLogins()}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar