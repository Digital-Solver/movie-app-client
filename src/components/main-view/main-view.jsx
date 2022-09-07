/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import PrimaryNav from '../primary-nav/primary-nav';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');

    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  onLoginRequest(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLogoutRequest() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  getMovies(token) {
    axios
      .get('https://kds-movie-api.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` } })
      .then((res) => { this.setState({ movies: res.data }); })
      .catch((err) => console.log(err));
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Route
          path="/"
          render={() => (
            <PrimaryNav
              onLogoutRequest={() => this.onLogoutRequest()}
              user={localStorage.getItem('user')}
            />
          )}
        />

        <Row className="main-view justify-content-md-center" style={{ maxWidth: '1200px', marginInline: 'auto' }}>

          <Route
            exact
            path="/"
            render={() => {
              if (!user) { // Show login view if there is no user logged in
                return (
                  <Col>
                    <LoginView onLoginRequest={(username) => this.onLoginRequest(username)} />
                  </Col>
                );
              }

              if (movies.length === 0) { return <div className="main-view" />; } // Show empty div until data is loaded

              return () => movies.map((movie) => ( // When movies load, show them in a card list
                <Col lg="auto" md={4} sm={6} xs="auto" style={{ marginInline: 'auto' }}>
                  <MovieCard
                    key={movie._id}
                    movieData={movie}
                  />
                </Col>
              ));
            }}
          />

          <Route // Registration view as alternative to login view
            exact
            path="/register"
            render={() => {
              if (user) {
                return <Redirect to="/" />;
              }
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route // Card list of movies (master)
            exact
            path="/"
            render={() => movies.map((movie) => (
              <Col lg="auto" md={4} sm={6} xs="auto" style={{ marginInline: 'auto' }}>
                <MovieCard
                  key={movie._id}
                  movieData={movie}
                />
              </Col>
            ))}
          />

          <Route // View of an individual movie (detail)
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (movies.length === 0) { return <div className="main-view" />; } // Show empty div until data is loaded
              return (
                <Col md="auto">
                  <MovieView
                    movieData={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:directorName"
            render={({ match, history }) => {
              if (movies.length === 0) { return <div className="director-view" />; } // Show empty div until data is loaded
              return (
                <Col md="auto">
                  <DirectorView
                    movieData={movies.find((m) => m.Director.Name === match.params.directorName)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:genreName"
            render={({ match, history }) => {
              if (movies.length === 0) { return <div className="genre-view" />; } // Show empty div until data is loaded
              return (
                <Col md="auto">
                  <GenreView
                    movieData={movies.find((m) => m.Genre.Name === match.params.genreName)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/users/:username"
            render={(history, match) => {
              if (!user) {
                return (
                  <LoginView
                    onLoginRequest={() => this.onLoggedIn(user)}
                  />
                );
              }
              if (movies.length === 0) { return <div className="profile-view" />; } // Show empty div until data is loaded
              return (
                <Col md="auto">
                  <ProfileView
                    user={user}
                    movies={movies}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

MainView.propTypes = {
  // movies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedMovie: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default MainView;
