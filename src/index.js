const {render} = wp.element;
// import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
/*
if (document.getElementById('plugin-starter-settings')) {
  render(<App/>, document.getElementById('plugin-starter-settings'));
}
*/

/*ReactDOM.render(<App />, document.getElementById('plugin-starter-settings'));*/
if (document.getElementById('plugin-starter-settings')) {
  const container = document.getElementById('plugin-starter-settings');
  const root = createRoot(container);
  root.render(<App />);
}