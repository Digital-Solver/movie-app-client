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
            <Card>
              <Card.Body>
                <Card.Title>Register a New Account</Card.Title>
                <Form action="submit" onSubmit={handleRegister}>
                  <Form.Group>
                    <Form.Label>
                      Register a Username:
                      <Form.Control
                        type="text"
                        value={userdata.user.Username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Username"
                      />
                      <p style={{ color: 'red' }}>{usernameErr}</p>
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      Register a Password:
                      <Form.Control
                        type="password"
                        value={userdata.user.Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        min={8}
                        placeholder="Password (min. 8 chars)"
                      />
                      <p style={{ color: 'red' }}>{passwordErr}</p>
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      Register an Email:
                      <Form.Control
                        type="email"
                        value={userdata.user.Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        min={8}
                        placeholder="john.doe@example.com"
                      />
                      <p style={{ color: 'red' }}>{emailErr}</p>
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      Register a Birthday:
                      <Form.Control
                        type="date"
                        value={userdata.user.Birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                        min={8}
                        placeholder="Password (min. 8 chars)"
                      />
                      <p style={{ color: 'red' }}>{birthdayErr}</p>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Button type="submit" onClick={validate}>Register</Button>
                  </Form.Group>
                  <Link to="/">Already have an account? Click here to log in.</Link>
                </Form>
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
