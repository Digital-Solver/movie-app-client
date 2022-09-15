// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Styles
import './profile-view.scss';

// Component
function UserInfo(props) {
  // Props
  const { userdata } = props;
  const username = userdata.user.Username;
  const email = userdata.user.Email;
  const birth = userdata.user.Birthday || '';

  // JSX
  return (
    <div className="user-info-container">
      <p className="user-info-username h2">{`${username}`}</p>
      <p>{`${email}`}</p>
      <p>{`${birth.slice(0, 10)}`}</p>
    </div>
  );
}

// PropTypes

UserInfo.propTypes = {
  userdata: PropTypes.shape({
    user: PropTypes.shape({
      Username: PropTypes.string,
      Password: PropTypes.string,
      Email: PropTypes.string,
      Birthday: PropTypes.string,
      FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    token: PropTypes.string,
  }).isRequired,
};

// Export
const mapStateToProps = (state) => {
  const { userdata } = state;
  return { userdata };
};

export default connect(mapStateToProps, null)(UserInfo);
