/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */

// External Dependencies
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Card, CardGroup, Row, Col } from 'react-bootstrap';

// Internal Dependencies
import { setUsername, setPassword, setEmail, setBirthday } from '../../actions/actions';
import './registration-view.scss';

// Component
function registrationView(props) {
  // Props
  const {
    setUsername,
    setPassword,
    setEmail,
    setBirthday,
    userdata } = props;

  // Local state
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

  // Methods
  const validate = () => {
    let isReq = true;

    if (!userdata.user.Username) {
      isReq = false;
      setUsernameErr('You must enter a username.');
    } else if (userdata.user.Username.length < 2) {
      isReq = false;
      setUsernameErr('Your username must be at least 2 characters.');
    }

    if (!userdata.user.Password) {
      isReq = false;
      setPasswordErr('You must enter a password.');
    } else if (userdata.user.Password.length < 8) {
      isReq = false;
      setPasswordErr('Your password must be at least 8 characters.');
    }

    if (!userdata.user.Email) {
      isReq = false;
      setEmailErr('You must enter an email.');
    } else if (!userdata.user.Email.includes('@')) {
      isReq = false;
      setEmailErr('Your password must be valid.');
    }

    if (!userdata.user.Birthday) {
      isReq = false;
      setBirthdayErr('You must enter a birthday.');
    }

    return isReq;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://kds-movie-api.herokuapp.com/users', {
          Username: userdata.user.Username,
          Password: userdata.user.Password,
          Email: userdata.user.Email,
          Birthday: userdata.user.Birthday,
        })
        .then(() => {
          window.open('/', '_self'); //
        })
        .catch((err) => { console.log(err); });
    }
  };

  // JSX
  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card className="credential-card">
              <Card.Body className="credential-card-body">
                {/* <Card.Title>Register a New Account</Card.Title> */}
                <Form action="submit" onSubmit={handleRegister}>
                  <Form.Group>
                    <Form.Label>
                      username
                      <Form.Control
                        className="credential-input"
                        type="text"
                        value={userdata.user.Username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="DavyJones98"
                      />
                      <p className="error-text">{usernameErr}</p>
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      password
                      <Form.Control
                        className="credential-input"
                        type="password"
                        value={userdata.user.Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        min={8}
                        placeholder="min. 8 chars"
                      />
                      <p className="error-text">{passwordErr}</p>
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      email
                      <Form.Control
                        className="credential-input"
                        type="email"
                        value={userdata.user.Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        min={8}
                        placeholder="john.doe@example.com"
                      />
                      <p className="error-text">{emailErr}</p>
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      birthday
                      <Form.Control
                        className="credential-input"
                        type="date"
                        value={userdata.user.Birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                        min={8}
                        placeholder="01-01-2000"
                      />
                      <p className="error-text">{birthdayErr}</p>
                    </Form.Label>
                  </Form.Group>

                  <Form.Group className="login-button-container">
                    <Button variant="credential" type="submit" onClick={validate}>Register</Button>
                  </Form.Group>

                </Form>
                <div className="toggle-credential-view-container">
                  <Link to="/" className="toggle-credential-view">login</Link>
                </div>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  );
}

// PropTypes
registrationView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.instanceOf(Date),
};

// Redux & Export
function mapStateToProps(state) {
  const { userdata } = state;
  return { userdata };
}

export default connect(mapStateToProps, {
  setUsername, setPassword, setEmail, setBirthday,
})(registrationView);
