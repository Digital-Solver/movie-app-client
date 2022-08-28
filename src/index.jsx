/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

// Import to bundle './index.scss
import './index.scss';

// Main component
class MovieApp extends React.Component {
  render() {
    return (<MainView />);
  }
}

// App root & render
const container = document.getElementsByClassName('app-container')[0]; // Find root element
ReactDOM.render(React.createElement(MovieApp), container); // Render app in root element
