/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './genre-view.scss';

// TODO: Make this component render - maybe because no directors collection in databse
class GenreView extends React.Component {
  render() {
    const { movieData, onBackClick } = this.props;

    return (
      <Card className="genre-view justify-content-md-center" style={{ backgroundColor: '#77685D', borderRadius: '5px' }}>
        {console.log(movieData)}
        <Card.Title style={{ color: 'white' }} className="genre-name">{movieData.Genre.Name}</Card.Title>
        <Card.Body style={{ color: 'white' }} className="genre-description">{movieData.Genre.Description}</Card.Body>
        <Button style={{ backgroundColor: '#058ED9' }} type="button" onClick={() => { onBackClick(); }}>Back</Button>
      </Card>
    );
  }
}

GenreView.propTypes = {
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
      Birth: PropTypes.instanceOf(Date).isRequired,
      Death: PropTypes.instanceOf(Date),
    }).isRequired,
    Featured: PropTypes.bool.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default GenreView;
