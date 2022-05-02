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
    {
      console.log(this.props.userName === this.props.name);
    }
    return (
      <Container
        className={
          this.props.userName === this.props.name ? "myMessage" : "message"
        }
      >
        <Container className="dataMessage">
          <p className="date">{this.props.time}</p>
          <p className="nick">{this.props.name}</p>
        </Container>
        <p className="bodyMessage">{this.props.text}</p>
      </Container>
    );
  }
}
