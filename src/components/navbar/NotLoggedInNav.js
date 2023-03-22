import { Link } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';

function NotLoggedInNav() {
  return (
    <>
      <Nav.Link as={Link} to='/' className='d-flex align-items-center'>Home</Nav.Link>
      <Nav.Link eventKey={1} as={Link} to="/login" className='d-flex align-items-center'>
        <Button variant="primary">Login</Button>
      </Nav.Link>
    </>
  )
}

export default NotLoggedInNav