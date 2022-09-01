/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

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
    axios.get('http://kds-movie-api.herokuapp.com/movies')
      .then((res) => { this.setState({ movies: res.data }); })
      .catch((err) => { console.log(err); });
  }

  onLoggedInUser(user) {
    this.setState({ user });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) {
      return (
        <div>
          <LoginView onLoggedInUser={(user) => this.onLoggedInUser(user)} />
          <br />
          <RegistrationView />
        </div>
      );
    }

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie

          ? (
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}
            />
          )

          : movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movieData={movie}
              onMovieClick={(movie) => { this.setSelectedMovie(movie); }}
            />
          ))}
      </div>
    );
  }
}

MainView.propTypes = {

};

export default MainView;
