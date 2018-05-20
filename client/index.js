import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

// if (document.location.search.indexOf('token=') === 1) {
//   const token = document.location.search.slice(1).split('&')[0].split('token=')[1];
//   window.localStorage.setItem('token', token);
//   window.location = '/';
// } else {
//   render(<hr />, document.getElementById('app'));
// }

render(<App />, document.getElementById('app'));
