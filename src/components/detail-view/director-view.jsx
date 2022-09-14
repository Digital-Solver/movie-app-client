/* eslint-disable react/prefer-stateless-function */

// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Row, Col,
} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

// Internal Dependencies
import './detail-view.scss';

// Component
function DirectorView(props) {
  // Props
  const { onBackClick } = props;
  const location = useLocation();
  const { movieData } = location.state;
  const posterAlt = `${movieData.Title} Poster`;

  // Methods
  console.log(movieData);
  if (!movieData.Director.Death === undefined) {
    const deathdate = movieData.Director.Death;
  } const deathdate = 'Still Alive';

  // JSX
  return (
    <Card className="detail-view justify-content-md-center">
      <Row className="detail-view-row">
        <Col className="detail-view-poster-container" lg={12} xl={6}>
          <Card.Img variation="top" className="movie-poster" src={movieData.ImageURL} crossOrigin="anonymous" alt={posterAlt} />
        </Col>

        <Col lg={12} xl={6} className="detail-view-content-outer-container">
          <div className="detail-view-content-inner-container">
            <Card.Title className="movie-title">{movieData.Title}</Card.Title>
            <div className="detail-navigation">
              <Link to={{ pathname: `/movies/${movieData._id}`, state: { movieData } }}>
                <Button variant="movie-detail" className="movie-detail-button" type="button">Scynopsis</Button>
              </Link>
              <Link to={{ pathname: `/directors/${movieData.Director.Name}`, state: { movieData } }}>
                <Button variant="movie-active-detail" className="movie-detail-button" type="button">Director</Button>
              </Link>
              <Link to={{ pathname: `/genres/${movieData.Genre.Name}`, state: { movieData } }}>
                <Button type="button" variant="movie-detail">Genre</Button>
              </Link>
            </div>
            <Card.Body className="director-name h5">{movieData.Director.Name}</Card.Body>
            <Card.Body className="director-life">{`${movieData.Director.Birth} - ${deathdate}`}</Card.Body>
            <Card.Body className="director-bio">{movieData.Director.Bio}</Card.Body>
            <Button type="button" onClick={() => { onBackClick(); }}>Back</Button>
          </div>
        </Col>
      </Row>
    </Card>

  );
}

// PropTypes
DirectorView.propTypes = {
  movieData: PropTypes.shape({
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }).isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

// Export
export default DirectorView;
