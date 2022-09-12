/* eslint-disable react/prefer-stateless-function */

// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

// Internal Dependencies
import './genre-view.scss';

// Component
class GenreView extends React.Component {
  // Lifecycle methods
  render() {
    // Props
    const { movieData, onBackClick } = this.props;

    // JSX
    return (
      <Card className="genre-view justify-content-md-center" style={{ backgroundColor: '#77685D', borderRadius: '5px' }}>
        <Card.Title style={{ color: 'white' }} className="genre-name">{movieData.Genre.Name}</Card.Title>
        <Card.Body style={{ color: 'white' }} className="genre-description">{movieData.Genre.Description}</Card.Body>
        <Button style={{ backgroundColor: '#058ED9' }} type="button" onClick={() => { onBackClick(); }}>Back</Button>
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
