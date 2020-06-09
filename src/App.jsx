/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from './actions/login';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
  }

  handleSelect = () => {
    const { dispatch } = this.props;
    dispatch(
      login({
        username: this.username.current.value,
        password: this.password.current.value,
      }),
    );
  };

  renderWelcomeMessage = () => {
    const { user } = this.props;
    return <div>{user.message}</div>;
  };

  renderInput = () => (
    <div>
      <Form.Control
        type="text"
        ref={this.username}
        placeholder="username"
      />
      <br />
      <Form.Control
        type="password"
        placeholder="password"
        ref={this.password}
      />
      <br />
      <Button onClick={() => this.handleSelect()}>Log in</Button>
    </div>
  );

  render() {
    const { user } = this.props;
    return (
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <h3>Please log in...!</h3>
          </Col>
          <Col xs={12}>{this.renderInput()}</Col>
          <Col xs={12}>{this.renderWelcomeMessage()}</Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  const {
    message,
  } = user || {
    message: '',
  };

  return { user };
}

const LoginApp = connect(mapStateToProps)(App);

export default LoginApp;
