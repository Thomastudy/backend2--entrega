import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useUser } from "../../contexts/UserContext";

export const NavBar = () => {

  return (
    <>
      <Navbar bg="secondary" data-bs-theme="light">
        <Nav className="navegacion me-auto">
          <Nav.Link
            className="navegacion__enlace pointer"
            as={NavLink}
            to="/category/aritos"
          >
            Aritos
          </Nav.Link>
          <Nav.Link
            className="navegacion__enlace pointer"
            as={NavLink}
            to="/category/collares"
          >
            Collares
          </Nav.Link>
          <Nav.Link
            className="navegacion__enlace pointer"
            as={NavLink}
            to="/category/pulseras"
          >
            Pulseras
          </Nav.Link>
        </Nav>
        
      </Navbar>
    </>
  );
};
