/* eslint-disable react/prefer-stateless-function */

// External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

// Internal Dependencies
import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view';
import './index.scss';

// Redux
const store = createStore(moviesApp, devToolsEnhancer());

// Component
class MovieApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid className="main-view-container">
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// DOM Render
const container = document.getElementsByClassName('app-container')[0];
ReactDOM.render(React.createElement(MovieApp), container);
