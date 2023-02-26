import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function LoggedInLinks() {
  return (
    <>
        <Nav.Link as={Link} to='/fullList'>Full List</Nav.Link>
    </>
  )
}

export default LoggedInLinks