/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      <div
        className="movie-card"
        onClick={() => { onMovieClick(movieData); }}
      >
        {movieData.Title}
      </div>
    );
  }
}

export default MovieCard;
