import React, { Component } from 'react';
import { ONA } from 'gisida';
import { Container, Row, Col, Form, FormGroup, Button, InputGroup, Input, InputGroupAddon, Alert } from 'reactstrap';
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
    const self = this;

    
    const customRequestFetchHandler = (res) => {
      console.log('custom requested!', res)
      if (!res || !res.status) return false;
      let status;
      let message = `${res.status}: `;
      switch (res.status) {
        case 200:
        case 302:
          status = 'success';
          if (res.status === 302) {
            message = message + 'Ok but request was redirected!'
          } else {
            message = message + 'All clear!'
          }
          break;
        case 401:
        case 404:
          status = 'warning'
          if (res.status === 401) {
            message = message + 'Unauthorized!!'
          } else {
            message = message + 'Page not found...';
          }
          break;
        default: 
          status = 'danger';
          message = message + 'Somethinging went wrong...?'
      }

      self.setState({ 
        customRequestStatus: status,
        customRequestMessage: message,
      })
    }


    const loggedInView = (
      <div>
        <h1>Logged In!</h1>
        <Form>
          {/* Ona access token */}
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">onadata access_token</InputGroupAddon>
              {/* <Label for="access-token-input">onadata access_token</Label> */}
              <Input disabled id="access-token-input" value={accessToken}></Input>
            </InputGroup>
          </FormGroup>

          {/* AuthZ & Resource Request Buttons*/}
          <FormGroup>
            <Button
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              self.props.getCookie(accessToken);
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

          {/* Custom Superset path  */}
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">{`http://localhost:8088/`}</InputGroupAddon>
              <Input innerRef={(input) => this.customPathInput = input} />
              <Button
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  const url = `http://localhost:8088/${this.customPathInput.value}`;
                  fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                  }).then(customRequestFetchHandler).catch((err) => {
                    console.log('custom connection error', err);
                    self.setState({ 
                      customRequestStatus: 'danger',
                      customRequestMessage: `Fetch Error: ${err}`,
                    })
                  })
                }}>Fetch!</Button>
            </InputGroup>
          </FormGroup>
          {this.state.customRequestStatus ? (
            <Alert color={this.state.customRequestStatus}>{this.state.customRequestMessage}</Alert>
          ) : ''}
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
