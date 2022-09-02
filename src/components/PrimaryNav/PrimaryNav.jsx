import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
// import './PrimaryNav.scss';

export default function PrimaryNav(props) {
  const { onBackClick, onLogoutRequest } = props;

  return (
    <div>
      <Navbar style={{ backgroundColor: '#483D3F' }}>
        <Container fluid style={{ maxWidth: '1200px', marginInline: 'auto' }}>
          <Navbar.Brand href="#home" style={{ color: 'white' }} onClick={() => { onBackClick(null); }}>Cynapse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{ color: 'white' }}>
            <Nav className="me-auto">
              <Nav.Link href="#home" style={{ color: 'white' }} onClick={() => { onBackClick(null); }}>Home</Nav.Link>
            </Nav>
            <Nav className="me-auto">
              <Nav.Link href="#logout" style={{ color: 'white' }} onClick={() => { onLogoutRequest(); }}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

PrimaryNav.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  onLogoutRequest: PropTypes.func.isRequired,
};
