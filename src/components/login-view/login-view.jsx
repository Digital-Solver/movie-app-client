/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button, Container, Card, CardGroup, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserdata } from '../../actions/actions';

function loginView(props) {
  const { setUserdata } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => { // Requests login via a POST request
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    console.log(username, password);
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
                <Form action="submit" noValidate validated={validated} onSubmit={handleSubmit}>
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
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid username.
                      </Form.Control.Feedback>
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
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                      </Form.Control.Feedback>
                    </Form.Label>
                  </Form.Group>

                  {/* Submit button */}
                  <Form.Group>
                    <Button type="submit">Login</Button>
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

export default connect(null, { setUserdata })(loginView);
