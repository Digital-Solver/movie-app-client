/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Form, Button, Container, Card, CardGroup, Row, Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './registration-view.scss';

export default function registrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

  const validate = () => {
    let isReq = true;

    if (!username) {
      isReq = false;
      setUsernameErr('You must enter a username.');
    } else if (username.length < 2) {
      isReq = false;
      setUsernameErr('Your username must be at least 2 characters.');
    }

    if (!password) {
      isReq = false;
      setPasswordErr('You must enter a password.');
    } else if (password.length < 8) {
      isReq = false;
      setPasswordErr('Your password must be at least 8 characters.');
    }

    if (!email) {
      isReq = false;
      setEmailErr('You must enter an email.');
    } else if (password.includes('@')) {
      isReq = false;
      setEmailErr('Your password must be valid.');
    }

    if (!birthday) {
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
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((res) => {
          const { data } = res;
          console.log(data);
          window.open('/', '_self'); //
        })
        .catch((err) => { console.log(err); });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Register a New Account</Card.Title>
                <Form action="submit">
                  <Form.Group>
                    <Form.Label>
                      Register a Username:
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Username"
                      />
                      {usernameErr && <p style={{ color: 'red' }}>{usernameErr}</p>}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      Register a Password:
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        min={8}
                        placeholder="Password (min. 8 chars)"
                      />
                      {passwordErr && <p style={{ color: 'red' }}>{passwordErr}</p>}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      Register an Email:
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        min={8}
                        placeholder="john.doe@example.com"
                      />
                      {emailErr && <p style={{ color: 'red' }}>{emailErr}</p>}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      Register a Birthday:
                      <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                        min={8}
                        placeholder="Password (min. 8 chars)"
                      />
                      {birthdayErr && <p style={{ color: 'red' }}>{birthdayErr}</p>}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Button type="submit" onClick={handleRegister}>Register</Button>
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

registrationView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.instanceOf(Date),
};
