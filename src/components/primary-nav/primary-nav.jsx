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
    <Navbar className="primary-navigation navbar-dark" expand="xs">
      <Container className="nav-container" fluid>
        <Link to="/">
          <Navbar.Brand className="scynapse-logo">SCYNAPSE</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="hamburger-icon" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto">
            {isAuth() && (
              <Link to="/">
                <Button className="navigation-link" variant="link" onClick={() => { onLogoutRequest(); }}>Logout</Button>
              </Link>
            )}
          </Nav>

          <Nav className="me-auto">
            {isAuth() && (
              <Link to={`/users/${user}`}>
                <Button className="navigation-link" variant="link">{`${user}'s Profile`}</Button>
              </Link>
            ) }
          </Nav>

          <Nav className="me-auto">
            {!isAuth() && (
              <Link to="/">
                <Button className="navigation-link" variant="link">Login</Button>
              </Link>
            )}
          </Nav>

          <Nav className="me-auto">
            {!isAuth() && (
              <Link to="/register">
                <Button className="navigation-link" variant="link">Register</Button>
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
