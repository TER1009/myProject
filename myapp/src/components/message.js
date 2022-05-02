import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../styles/messageStyle.css";

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  render() {
    return (
      <Container className="message">
        <p className="date">{this.props.time}</p>
        <p className="nick">{this.props.name}</p>
        <p className="bodyMessage">{this.props.text}</p>
      </Container>
    );
  }
}
