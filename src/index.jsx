/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view';

// Import to bundle './index.scss
import './index.scss';

// Initialise Redux Store
const store = createStore(moviesApp, devToolsEnhancer());

// Main component
class MovieApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid className="main-view-container" style={{ margin: 0, padding: 0 }}>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// App root & render
const container = document.getElementsByClassName('app-container')[0]; // Find root element
ReactDOM.render(React.createElement(MovieApp), container); // Render app in root element
