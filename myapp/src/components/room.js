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
      topic: "",
      time: "",
    };
  }

  changeTopic = (e) => {
    this.setState({
      topic: e.target.value,
    });
  };

  createR = async () => {
    let _body = { topic: this.state.topic };
    await fetch("https://localhost:5001/api/chat/roomCreate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(_body),
    }).then((response) => {
      response.json().then((result) => {
        console.log(result);
      });
    });
    this.props.onCreate(false);
  };

  render() {
    if (this.props.create)
      return (
        <Container className="createRoom">
          <Form.Control
            type="text"
            className="textThemeRoom"
            placeholder="Тема комнаты"
            onChange={this.changeTopic}
          />
          <Button
            className="accept"
            variant="primary"
            onClick={async () => {
              this.createR();
              this.props.update();
            }}
          >
            Создать
          </Button>
          <Button
            className="cancel"
            onClick={() => {
              this.props.onCreate(false);
              this.props.update();
            }}
          >
            Отмена
          </Button>
        </Container>
      );
    else
      return (
        <Container key={this.props.id} id={this.props.id} className="room">
          <div id={this.props.id} className="topic">
            {this.props.topic}
          </div>
          <div id={this.props.owner} className="owner">
            {this.props.owner}
          </div>
        </Container>
      );
  }
}
