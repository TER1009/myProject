import PropTypes from "prop-types";
import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="chatMain">
        <p className="chatButton">Чат</p>
      </Container>
    );
  }
}
