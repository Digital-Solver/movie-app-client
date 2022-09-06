import React from 'react';

function UserInfo(username, email, favouriteMovies) {
  // BUG: Props are "[object Object]" despite having been destructured
  const getFavouriteMovies = () => {
    if (!favouriteMovies) {
      return <p>Favourite Some Movies To See Your List</p>;
    }
    return <p>{favouriteMovies}</p>;
  };

  return (
    <div>
      <h2>Your Info:</h2>
      <p>{`Username: ${username}`}</p>
      <p>{`Email: ${email}`}</p>
      <p>{`Favourite Movies: ${getFavouriteMovies()}`}</p>
    </div>
  );
}

export default UserInfo;
