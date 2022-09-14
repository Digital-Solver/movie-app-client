/* eslint-disable react/prefer-stateless-function */

// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Internal Dependencies
import '../detail-view.scss';

// Component
class GenreView extends React.Component {
  // Lifecycle methods
  render() {
    // Props
    const { movieData, onBackClick } = this.props;
    const posterAlt = `${movieData.Title} Poster`;
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
                <Link to={`/movies/${movieData._id}`}>
                  <Button variant="movie-detail" className="movie-detail-button" type="button">Scynopsis</Button>
                </Link>
                <Link to={`/directors/${movieData.Director.Name}`}>
                  <Button variant="movie-detail" className="movie-detail-button" type="button">Director</Button>
                </Link>
                <Link to={`/genres/${movieData.Genre.Name}`}>
                  <Button type="button" variant="movie-active-detail">Genre</Button>
                </Link>
              </div>
              <Card.Title className="genre-name">{movieData.Genre.Name}</Card.Title>
              <Card.Body className="genre-description">{movieData.Genre.Description}</Card.Body>
              <Button type="button" onClick={() => { onBackClick(); }}>Back</Button>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

// PropTypes
GenreView.propTypes = {
  movieData: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

// Export
export default GenreView;
