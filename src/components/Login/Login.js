import React, { Component } from 'react';
import Cookie from 'js-cookie';
import { ONA, SupAuth } from 'gisida';
import { Router } from 'gisida-react';
import './Login.scss';
Cookie.set('dsauth', false);
const AUTH_CONFIG = {
  clientID: 'MJbatg9UM7PloX3ba16Q001scbFxGtAXqmmBKoxH',
  callback: 'http://localhost:3000/callback',
}

export const isLoggedIn = function () {
  return Cookie.get('dsauth') === "true";
};

export const logOut = (e, props) => {
  e.preventDefault();
  SupAuth.defaultUnSupAuthZ();
  Cookie.set('dsauth', false);
  window.accessToken = undefined;
  Router.history.push('/login');
};

export class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="login">
        <div>
          <form className="login-form" onSubmit={ (e) => { logOut(e); } }>
            <button className="btn btn-default center-block" type="submit">Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

export class Login extends Component {
  constructor(props) {
    super(props);

    const { clientID, callback } = AUTH_CONFIG;
    this.state = {
      loginError: false,
      oauthURL: ONA.Oauth2.getOauthURL(clientID, callback),
    };
  }

  handleLogin() {
    if (!isLoggedIn()) {
      window.location.href = this.state.oauthURL;
    } else {
      Router.history.push('/');
    }
  }

  render() {
    return (
      <div className="login">
        <div>
          <form className="login-form" onSubmit={ (e) => { e.preventDefault(); this.handleLogin(); } }>
            <button className="btn btn-default center-block" type="submit">Log In</button>
          </form>
        </div>
      </div>
    );
  }
}
