import React from 'react';
import ReactDOM from 'react-dom';

// Import to bundle './index.scss
import './index.scss';

// Main component
class MovieApp extends React.Component {
  render() {
    return (
      <div className="movie-app">
        <div>Good morning</div>
      </div>
    );
  }
}

// App root & render
const container = document.getElementsByClassName('app-container')[0];
ReactDOM.render(React.createElement(MovieApp), container);
