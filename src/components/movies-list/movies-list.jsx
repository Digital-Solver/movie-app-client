/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

// External Dependencies
import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

// Internal Dependencies
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';

// Component
function MoviesList(props) {
  // Props
  const {
    movies,
    visibilityFilter,
    userdata,
  } = props;

  // Methods
  let filteredMovies = movies;
  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) => m.Title.toLowerCase()
      .includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) { return <div className="main-view" />; }

  // JSX
  return (
    <>
      <Col className="search-input-container" md={12}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) => (
        <Col className="movie-card-container" sm key={m._id}>
          <MovieCard className="movie-card" movieData={m} user={userdata.user.Username} />
        </Col>
      ))}
    </>
  );
}

// Redux & Export
const mapStateToProps = (state) => {
  const { visibilityFilter, userdata } = state;
  return { visibilityFilter, userdata };
};

export default connect(mapStateToProps)(MoviesList);
