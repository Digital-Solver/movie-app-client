/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './director-view.scss';

// TODO: Make this component render - director data is being loaded from db so thats not the issue

class DirectorView extends React.Component {
  static getDeath(deathDate) {
    if (!deathDate) {
      return 'Still Alive';
    } return deathDate;
  }

  render() {
    const { movieData, onBackClick } = this.props;

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

DirectorView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }).isRequired,
    Featured: PropTypes.bool.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default DirectorView;
