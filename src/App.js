import React, { Component } from 'react';
import { ONA } from 'gisida';
import { Container, Row, Col, Form, FormGroup, Button, InputGroup, Input, InputGroupAddon } from 'reactstrap';
import './App.css';

const AUTH_CONFIG = {
  clientID: 'MJbatg9UM7PloX3ba16Q001scbFxGtAXqmmBKoxH',
  callback: 'http://localhost:3000',
}

const getParameterByName = (name) => {
  var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

const getAccessToken = () => {
  return getParameterByName('access_token');
};

class App extends Component {
  constructor(props) {
    super(props);
    
    // check / set access_token from localstorage or url hash
    const accessToken = localStorage.getItem('access_token') || getAccessToken();
    if (!localStorage.getItem('access_token') && accessToken) {
      localStorage.setItem('access_token', accessToken);
      window.history.replaceState('asdf', 'Test App', '/');
    }

    this.state = {
      isLoggedIn: typeof accessToken === 'string',
      oauthURL: ONA.Oauth2.getOauthURL(AUTH_CONFIG.clientID, AUTH_CONFIG.callback),
      accessToken,
    }
  }

  render() {
    const { isLoggedIn, oauthURL, accessToken } = this.state;

    const loggedInView = (
      <div>
        <h1>Logged In!</h1>
        <Form>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">onadata access_token</InputGroupAddon>
              {/* <Label for="access-token-input">onadata access_token</Label> */}
              <Input disabled id="access-token-input" value={accessToken}></Input>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Button
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              this.props.getCookie(accessToken);
            }}
          >AuthZ Request</Button>
          {' '}
          <Button
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              this.props.getSlice(accessToken);
            }}
          >Slice Request</Button>
          </FormGroup>
        </Form>

        
        

        <Button
          block
          color="secondary"
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem('access_token');
            window.location.href = AUTH_CONFIG.callback;
          }}
        >Log Out</Button>
      </div>
    );

    const loggedOutView = (
      <div>
        <h1>Logged Out</h1>
        <Button color="primary"
          onClick={(e) => {
            e.preventDefault(); 
            window.location.href = oauthURL;
          }}
        >Log In</Button>
      </div>
    );

    return (
      <div className="App">
        <Container>
          <Row>
            <Col
              xs={{ size: 12 }}
              sm={{ size: 6, offset: 3 }}
            >{isLoggedIn ? loggedInView : loggedOutView}</Col>
          </Row>
        </Container>   
      </div>
    );
  }
}

export default App;
