/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-shadow */

// External Dependencies
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Internal Dependencies
// - Redux Actions
import { setUserdata, setMovies } from '../../actions/actions';

// - React Components
import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import PrimaryNav from '../primary-nav/primary-nav';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import UpdateUser from '../profile-view/update-user';
import FavoriteMovies from '../profile-view/favorite-movies';

// Component
class MainView extends React.Component {
  // Lifecycle Methods
  constructor(props) {
    super(props);
    const { setUserdata } = this.props;

    if (localStorage.getItem('user') !== null) {
      setUserdata({
        user: { Username: localStorage.getItem('user') },
        token: localStorage.getItem('token') });
    }
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getMovies(accessToken);
    }
  }

  // Class Methods
  onLoginRequest(authData) {
    const { setUserdata } = this.props;
    setUserdata(authData);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLogoutRequest() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserdata(null);
    window.open('/', '_self');
  }

  getMovies(token) {
    const { setMovies } = this.props; // Extracts the action dispatcher
    axios
      .get('https://kds-movie-api.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` } })
      .then((res) => { setMovies(res.data); })
      .catch((err) => console.log(err));
  }

  render() {
    const { movies } = this.props;

    return (
      <Router>

        <Route // Navigation
          path="/"
          render={() => (
            <PrimaryNav
              onLogoutRequest={() => this.onLogoutRequest()}
              user={localStorage.getItem('user')}
            />
          )}
        />

        <Row className="main-view justify-content-md-center">

          <Route // Login
            exact
            path="/"
            render={() => {
              if (!localStorage.getItem('user')) { // Show login view if there is no user logged in
                return (
                  <Col>
                    <LoginView onLoginRequest={(username) => this.onLoginRequest(username)} />
                  </Col>
                );
              }

              if (movies.length === 0) { return <div className="main-view" />; } // Show empty div until data is loaded
              return <MoviesList movies={movies} />;
            }}
          />

          <Route // Registration
            exact
            path="/register"
            render={() => {
              if (localStorage.getItem('user')) {
                return <Redirect to="/" />;
              }
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route // Movie Details
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

          <Route // Director Details
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

          <Route // Genre Details
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

          <Route // Profile
            path="/users/:username"
            exact
            render={() => {
              const { userdata } = this.props;

              // Redirect to Login Page if not signed in
              if (!localStorage.getItem('user')) {
                return (
                  <LoginView
                    onLoginRequest={(username) => this.onLoggedIn(username)}
                  />
                );
              }

              // Show empty div until data is loaded
              if (movies.length === 0) { return <div className="profile-view" />; }
              return (
                <Col md="auto">
                  <ProfileView
                    user={userdata.user.Username}
                    movies={movies}
                    token={userdata.token}
                  />
                </Col>
              );
            }}
          />
          <Route // Edit Profile
            path="/users/:username/edit"
            exact
            render={() => {
              const { userdata } = this.props;
              return (
                <UpdateUser userdata={userdata} />
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

//  PropTypes
MainView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  userdata: PropTypes.shape({
    user: PropTypes.shape({
      Username: PropTypes.string,
      FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    token: PropTypes.string,
  }).isRequired,
  setMovies: PropTypes.func.isRequired,
  setUserdata: PropTypes.func.isRequired,
};

// Redux & Export
const mapStateToProps = (state) => ({ movies: state.movies, userdata: state.userdata });
export default connect(mapStateToProps, { setMovies, setUserdata })(MainView);
