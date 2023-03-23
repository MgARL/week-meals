import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Button, Row, Col } from 'react-bootstrap';
import { GlobalContext } from '../../Contexts/GlobalContext';

function LoggedInNav({ currentUser }) {
    const { setIsLoggedIn, setCurrentUser } = useContext(GlobalContext);

    const LogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setCurrentUser(null);
        setIsLoggedIn(false);
    }
    return (
        <>
            <Nav.Link as={Link} to='/' className='d-flex align-items-center'>Home</Nav.Link>
            <Nav.Link as={Link} to='/fullList' className='d-flex align-items-center'>Full List</Nav.Link>
            <Nav.Link eventKey={1} as={Link} to="/login" className='d-flex align-items-center'>
                <div>
                    <Row>
                        <Col xs={12}>
                            Welcome {currentUser}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Button onClick={() => { LogOut() }} variant="primary">SignOut</Button>
                        </Col>
                    </Row>
                </div>
            </Nav.Link>
        </>
    )
}

export default LoggedInNav