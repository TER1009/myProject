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
        <p className="date">
          {this.state.time.getDate() +
            "." +
            this.state.time.getMonth() +
            "." +
            this.state.time.getFullYear() +
            " " +
            this.state.time.getHours() +
            ":" +
            this.state.time.getMinutes()}
        </p>
        <p className="nick">{this.props.nick}</p>
        <p className="bodyMessage">{this.props.text}</p>
      </Container>
    );
  }
}
