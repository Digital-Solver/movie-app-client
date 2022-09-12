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
      <Col md={12} style={{ margin: '1rem' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) => (
        <Col md={3} sm="auto" key={m._id} style={{ marginInline: 'auto' }}>
          <MovieCard movieData={m} user={userdata.user.Username} />
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
