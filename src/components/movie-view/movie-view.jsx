/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImageURL} alt="{movie.Title} poster" />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="Value">{movie.Description}</span>
        </div>
        <button type="button" onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}

export default MovieView;
