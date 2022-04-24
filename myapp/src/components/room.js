import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../styles/roomStyle.css";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      wait: false,
      create: true,
    };
  }
  render() {
    if (this.props.create)
      return (
        <Container className="createRoom">
          <Form.Control
            type="text"
            className="textThemeRoom"
            placeholder="Тема комнаты"
          />
          <Button className="accept" variant="primary" onClick={()=>{
            
          }}>
            Создать
          </Button>
        </Container>
      );
    else
      return (
        <Container id={this.state.id} className="room">
          this Room
        </Container>
      );
  }
}
