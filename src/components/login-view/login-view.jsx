/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */

// External Dependencies
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Container, Card, CardGroup, Row, Col } from 'react-bootstrap';

// Internal Dependencies
import { setUsername, setPassword } from '../../actions/actions';

// Component
function loginView(props) {
  // Props
  const { setUsername, setPassword, userdata } = props;
  const password = userdata.user.Password;
  const username = userdata.user.Username;

  // Local State
  const [validated, setValidated] = useState(false);

  // Methods
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
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

  // JSX
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
                        value={userdata.user.Username}
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
                        onChange={(e) => { setPassword(e.target.value); }}
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

// PropTypes
loginView.propTypes = {
  onLoginRequest: PropTypes.func.isRequired,
};

// Redux & Export
function mapStateToProps(state) {
  const { userdata } = state;
  return { userdata };
}

export default connect(mapStateToProps, { setUsername, setPassword })(loginView);
