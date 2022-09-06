/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button, Container, Card, CardGroup, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function loginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => { // Requests login via a POST request
    e.preventDefault();
    axios
      .post('https://kds-movie-api.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then((res) => {
        const { data } = res;
        const authData = data;
        props.onLoginRequest(authData);
      })
      .catch((err) => { console.log(err); });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Login with Existing Account</Card.Title>
                <Form action="submit">
                  <Form.Group>

                    {/* Username input */}
                    <Form.Label>
                      Username:
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Username"
                      />
                    </Form.Label>
                  </Form.Group>

                  {/* Password Input */}
                  <Form.Group>
                    <Form.Label>
                      Password:
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        min={8}
                        placeholder="Password (min. 8 chars)"
                      />
                    </Form.Label>
                  </Form.Group>

                  {/* Submit button */}
                  <Form.Group>
                    <Button type="submit" onClick={handleSubmit}>Login</Button>
                  </Form.Group>

                </Form>
                <Link to="/register">Register</Link>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

loginView.propTypes = {
  onLoginRequest: PropTypes.func.isRequired,
};
