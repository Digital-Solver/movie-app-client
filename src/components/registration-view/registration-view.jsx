/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button, Container, Card, CardGroup, Row, Col,
} from 'react-bootstrap';
import './registration-view.scss';
import axios from 'axios';

export default function registrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, passwordErr] = setPasswordErr('');

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

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefeault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://kds-movie-api.herokuapp.com/users', {
        Username: username,
        Password: password,
      })
        .then((res) => {
          const { data } = res;
          props.onLoggedIn(data);
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
                      {usernameErr && <p>{usernameErr}</p>}
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
                      {passwordErr && <p>{passwordErr}</p>}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Button type="submit" onClick={handleSubmit()}>Register</Button>
                  </Form.Group>

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
};
