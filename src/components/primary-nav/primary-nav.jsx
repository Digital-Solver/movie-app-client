/* eslint-disable object-curly-newline */

// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

// Internal Dependencies
import './primary-nav.scss';

// Component
export default function PrimaryNav(props) {
  // Props
  const { onLogoutRequest, user } = props;

  // Methods
  const isAuth = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    }

    return false;
  };

  // JSX
  return (
    <Navbar style={{ backgroundColor: '#483D3F' }}>
      <Container fluid style={{ maxWidth: '1200px', marginInline: 'auto' }}>
        <Link to="/">
          <Navbar.Brand style={{ color: 'white' }}>Cynapse</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ color: 'white' }}>

          <Nav className="me-auto">
            {isAuth() && (
              <Link to="/">
                <Button variant="link" style={{ color: 'white' }} onClick={() => { onLogoutRequest(); }}>Logout</Button>
              </Link>
            )}
          </Nav>

          <Nav className="me-auto">
            {isAuth() && (
              <Link to={`/users/${user}`}>
                <Button variant="link" style={{ color: 'white' }}>{`${user}'s Profile`}</Button>
              </Link>
            ) }
          </Nav>

          <Nav className="me-auto">
            {!isAuth() && (
              <Link to="/">
                <Button variant="link" style={{ color: 'white' }}>Login</Button>
              </Link>
            )}
          </Nav>

          <Nav className="me-auto">
            {!isAuth() && (
              <Link to="/register" style={{ color: 'white' }}>
                <Button variant="link" style={{ color: 'white' }}>Register</Button>
              </Link>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// PropTypes
PrimaryNav.propTypes = {
  onLogoutRequest: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};
