import React from 'react';
import ReactDOM from 'react-dom';
import superset from '@onaio/superset-connector';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


// Slice resource request
// note - we don't have the authz set up in the browser yet so this call
//        will always get a 401 if it succesfully passes the cors policy
const getSlice = (callback) => {
  superset.api.fetch({
    endpoint: 'slice',
    extraPath: '1',
    base: 'http://localhost:8088/'
  }, (res) => 
    callback(res))
  .catch((err) => 
    callback(err));
}

ReactDOM.render((
  <App
    getCookie={superset.authZ}
    getSlice={getSlice}
    deAuthZ={superset.deAuthZ}
  />
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
