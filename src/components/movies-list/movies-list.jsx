/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

// External Dependencies
import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
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
      <p className="movies-list-subtitle h5">Search Sci-Fi Films</p>
      <Col className="search-input-container" md={12}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>

      <Container>
        <Row className="movie-list-container" fluid="xxl">
          {filteredMovies.map((m) => (
            <Col className="movie-card-container col-md-3" xxl={3} xl={4} lg={6} md={6} sm={12}>
              <MovieCard key={m._id} className="movie-card" movieData={m} user={userdata.user.Username} favorite={[userdata.user.FavoriteMovies]} />
            </Col>
          ))}
        </Row>
      </Container>
    </ >
  );
}

// Redux & Export
const mapStateToProps = (state) => {
  const { visibilityFilter, userdata } = state;
  return { visibilityFilter, userdata };
};

export default connect(mapStateToProps)(MoviesList);
