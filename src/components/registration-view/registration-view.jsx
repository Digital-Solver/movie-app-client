/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Form, Button, Container, Card, CardGroup, Row, Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setUsername, setPassword, setEmail, setBirthday,
} from '../../actions/actions';

import './registration-view.scss';

function registrationView(props) {
  const {
    setUsername, setPassword, setEmail, setBirthday, userdata,
  } = props;

  const password = userdata.user.Password;
  const username = userdata.user.Username;
  const email = userdata.user.Email;
  const birthday = userdata.user.Birthday;

  let usernameErr;
  let passwordErr;
  let emailErr;
  let birthdayErr;

  const validate = () => {
    let isReq = true;

    if (!username) {
      isReq = false;
      usernameErr = 'You must enter a username.';
    } else if (username.length < 2) {
      isReq = false;
      usernameErr = 'Your username must be at least 2 characters.';
    }

    if (!password) {
      isReq = false;
      passwordErr = 'You must enter a password.';
    } else if (password.length < 8) {
      isReq = false;
      passwordErr = 'Your password must be at least 8 characters.';
    }

    if (!email) {
      isReq = false;
      emailErr = 'You must enter an email.';
    } else if (!email.includes('@')) {
      isReq = false;
      emailErr = 'Your email must be valid.';
    }

    if (!birthday) {
      isReq = false;
      birthdayErr = 'You must enter a birthday.';
    }
    console.log([isReq, usernameErr, passwordErr, emailErr, birthdayErr]);
    return [isReq, usernameErr, passwordErr, emailErr, birthdayErr];
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validate()[0]) {
      axios
        .post('https://kds-movie-api.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((res) => {
          const { data } = res;
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
                <Form action="submit" onSubmit={handleRegister}>
                  <p style={{ display: 'none' }}>{validate()}</p> {/*HACK: Can't get it to validate form on submit or button click */}
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
                      <p style={{ color: 'red' }}>{usernameErr}</p>
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
                      <p style={{ color: 'red' }}>{passwordErr}</p>
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
                      <p style={{ color: 'red' }}>{emailErr}</p>
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

registrationView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.instanceOf(Date),
};

function mapStateToProps(state) {
  const { userdata } = state;
  return { userdata };
}

export default connect(mapStateToProps, {
  setUsername, setPassword, setEmail, setBirthday,
})(registrationView);
