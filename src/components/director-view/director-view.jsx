/* eslint-disable react/prefer-stateless-function */

// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

// Internal Dependencies
import './director-view.scss';

// Component
class DirectorView extends React.Component {
  // Class & Static Methods
  static getDeath(deathDate) {
    if (!deathDate) {
      return 'Still Alive';
    } return deathDate;
  }

  render() {
    // Props
    const { movieData, onBackClick } = this.props;

    // JSX
    return (
      <Card className="director-view justify-content-md-center" style={{ backgroundColor: '#77685D', borderRadius: '5px' }}>
        <Card.Title style={{ color: 'white' }} className="director-name">{movieData.Director.Name}</Card.Title>
        <Card.Body style={{ color: 'white' }} className="director-bio">{movieData.Director.Bio}</Card.Body>
        <Card.Body style={{ color: 'white' }} className="director-life">{`${movieData.Director.Birth} - ${DirectorView.getDeath(movieData.Director.Death)}`}</Card.Body>
        <Button style={{ backgroundColor: '#058ED9' }} type="button" onClick={() => { onBackClick(); }}>Back</Button>
      </Card>
    );
  }
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
