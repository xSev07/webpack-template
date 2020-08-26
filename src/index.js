import './js/common';
import './assets/css/main.css';
import './assets/scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Example from './components/example/example.jsx';

const init = () => {
  ReactDOM.render(
      <Example/>,
      document.querySelector(`#root`)
  );
};

init();
