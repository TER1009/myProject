import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../styles/chatDialogStyle.css";
import Message from "./message";

export default class ChatDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagges: [],
    };
  }

  getMessages = async () => {
    let _body = { id: this.props.idroom };
    fetch("https://localhost:5001/api/chat/roomsGet", {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_body),
    }).then((response) => {
      response.json().then((result) => {
        if (result.length !== 0) {
          this.setState({ messagges: result });
        }
      });
    });
  };

  render() {
    return (
      <Container className="ChatDialog">
        <Container className="bodyChatDialog">
          {this.state.messagges.length > 0 && <Message />}
        </Container>
        <Container className="postMessage">
          <Form.Control type="text" className="textMessage" />
          <Button className="postBut">Отправить</Button>
        </Container>
      </Container>
    );
  }
}
