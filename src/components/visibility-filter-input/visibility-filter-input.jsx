import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  const { visibilityFilter, setFilter } = props;
  return (
    <Form.Control
      onChange={(e) => setFilter(e.target.value)}
      value={visibilityFilter}
      plcaeholder="filter"
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
