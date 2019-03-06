import React from 'react';
import ReactDOM from 'react-dom';
import { SUPERSET } from 'gisida';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


// Slice resource request
// note - we don't have the authz set up in the browser yet so this call
//        will always get a 401 if it succesfully passes the cors policy
const getSlice = () => {
  SUPERSET.API.fetch({
    endpoint: 'slice',
    extraPath: '1',
    base: 'http://localhost:8088/'
  }, (res) => {
    console.log('yay!', res)
    // debugger;
  }).catch((err) => {
    console.log('err', err);
    // debugger;
  });
}

ReactDOM.render(<App getCookie={SUPERSET.authZ} getSlice={getSlice} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
