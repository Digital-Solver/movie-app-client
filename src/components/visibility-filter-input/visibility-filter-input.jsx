/* eslint-disable no-shadow */

// External Dependencies
import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Internal Dependencies
import { setFilter } from '../../actions/actions';
import './visibility-filter-input.scss';

// Component
function VisibilityFilterInput(props) {
  const { visibilityFilter, setFilter } = props;
  return (
    <Form.Control
      onChange={(e) => setFilter(e.target.value)}
      value={visibilityFilter}
      className="filter-input"
    />
  );
}

// PropTypes
VisibilityFilterInput.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

// Redux & Exports
export default connect(null, { setFilter })(VisibilityFilterInput);
