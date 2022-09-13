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
    <Navbar className="primary-navigation navbar-light justify-content-end" expand="xs">
      <Container className="nav-container" fluid>
        <div className="nav-spacer" />
        <div className="logo-container">
          <Link to="/">
            <Navbar.Brand className="scynapse-logo">SCYNAPSE</Navbar.Brand>
          </Link>
          <svg className="logo-underline" width="155" height="2" viewBox="0 0 161 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="1" x2="161" y2="0.999986" stroke="#380EAE" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5 3 7 9 3" />
          </svg>
        </div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="hamburger-icon" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto">
            {isAuth() && (
            <Link to={`/users/${user}`}>
              <Button className="navigation-link" variant="link">
                <svg height="7.5" width="7.5">
                  <circle cx="3.25" cy="3.25" r="3.25" stroke="black" strokeWidth="0" fill="green" />
                </svg>
                <span className="username-span">{` ${user}`}</span>
              </Button>
            </Link>
            ) }
          </Nav>

          <Nav className="me-auto">
            {isAuth() && (
              <Link to="/">
                <Button className="navigation-link" variant="link" onClick={() => { onLogoutRequest(); }}>Logout</Button>
              </Link>
            )}
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
