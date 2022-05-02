import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../styles/chatDialogStyle.css";
import Message from "./message";

export default class ChatDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagges: [],
      textMessage: "",
      timer: "",
    };
  }

  getMessages = async () => {
    let _body = { id: this.props.idroom };
    fetch("https://localhost:5001/api/chat/getMessages", {
      method: "POST",
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
          console.log("dialog! " + result[0].name);
          this.setState({ messagges: result });
        }
      });
    });
  };

  changeMessage = (e) => {
    this.setState({ textMessage: e.target.value });
  };

  postMessage = async (e) => {
    let _time = new Date();
    let _body = {
      roomId: this.props.idroom,
      text: this.state.textMessage,
      time:
        _time.getDate() +
        "." +
        _time.getMonth() +
        "." +
        _time.getFullYear() +
        " " +
        _time.getHours() +
        ":" +
        _time.getMinutes(),
    };
    console.log(_body);
    fetch("https://localhost:5001/api/chat/postMessage", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_body),
    });
  };

  componentDidUpdate() {
    console.log("dialog " + this.props.online);
    if (!this.props.online) clearInterval(this.state.timer);
  }

  componentDidMount() {
    let timer = setInterval(() => {
      this.getMessages();
    }, 500);
    this.setState({ timer: timer });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    return (
      <Container className="ChatDialog">
        <Container className="bodyChatDialog">
          {true ? (
            this.state.messagges.map((message) => (
              <Message
                userName={this.props.name}
                key={message.id}
                time={message.time}
                name={message.name}
                text={message.text}
                ownerid={message.ownerId}
              />
            ))
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </Container>
        <Container className="postMessage">
          <Form.Control
            type="text"
            className="textMessage"
            onChange={this.changeMessage}
          />
          <Button
            className="postBut"
            onClick={(e) => {
              this.postMessage();
              let block = document.querySelector(".textMessage");
              block.value = "";
            }}
          >
            Отправить
          </Button>
        </Container>
      </Container>
    );
  }
}
