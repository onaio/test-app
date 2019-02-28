import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { SUPERSET } from 'gisida';
// Slice resource request
// note - we don't have the authz set up in the browser yet so this call
//        will always get a 401 if it succesfully passes the cors policy
SUPERSET.API.fetch({
  endpoint: 'slice',
  extraPath: '892',
  supersetToken: '1MI2BMkaZIg01cwSm7g5CknxeEASl5', // comment out to remove Custom-Api-Token header
}, (res) => {
  console.log('yay!', res)
  // debugger;
}).catch((err) => {
  console.log('err', err);
  // debugger;
});


// Basic AuthZ request
// note - this request will eventually need to parse the cookies returned in the response,
//        but we need to be able to send the token via Custom-Api-Token header
// const headers = new Headers();
// headers.append('Custom-Api-Token', '1MI2BMkaZIg01cwSm7g5CknxeEASl5');
// fetch('http://localhost:8088/oauth-authorized/onadata', {
//   headers, // comment to remove Custom-Api-Token header
//   method: 'GET'
// }).then((res) => {
//   console.log('res', res)
// }).catch((err) => {
//   console.log('err', err);
// })


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
