/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import PrimaryNav from '../PrimaryNav/PrimaryNav';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');

    // TODO: accessToken should equal token supplied by the API, not just 'exist'.
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
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
  }

  getMovies(token) {
    axios
      .get('https://kds-movie-api.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` } })
      .then((res) => { this.setState({ movies: res.data }); })
      .catch((err) => console.log(err));
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) {
      return (
        <div>
          <LoginView
            onLoginRequest={(username) => this.onLoginRequest(username)}
          />
          <br />
          <RegistrationView />
        </div>
      );
    }

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <>
        <PrimaryNav
          onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}
          onLogoutRequest={() => this.onLogoutRequest()}
        />

        <Row className="main-view justify-content-md-center" style={{ maxWidth: '1200px', marginInline: 'auto' }}>
          {selectedMovie
            ? (
              <Col md={4}>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}
                />
              </Col>
            )
            : movies.map((movie) => (
              <Col lg="auto" md={4} sm={6} xs="auto" style={{ marginInline: 'auto' }}>
                <MovieCard
                  key={movie._id}
                  movieData={movie}
                  onMovieClick={() => { this.setSelectedMovie(movie); }}
                />
              </Col>
            ))}
        </Row>
      </>
    );
  }
}

MainView.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  movies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedMovie: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default MainView;
