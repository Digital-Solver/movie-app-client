/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button, Container, Card, CardGroup, Row, Col,
} from 'react-bootstrap';
import './registration-view.scss';

export default function registrationView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Button type="submit">Register</Button>
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
