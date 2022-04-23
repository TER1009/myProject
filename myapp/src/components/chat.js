import PropTypes from "prop-types";
import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";
import "../styles/chatStyle.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: [],
      create: false,
    };
  }

  render() {
    return (
      <Container className="chatMain">
        <p
          className="chatButton"
          onClick={() => {
            let block = document.querySelector(".chatBody");
            console.log("chat " + block);
            if (block.style.display) {
              block.style.display = null;
            } else {
              block.style.display = "inline";
            }
          }}
        >
          Чат
        </p>
        <Container className="chatBody">
          <Container className="panel">
            <AddCircleOutlineIcon
              onClick={() => {
                this.setState({ create: true });
              }}
            />
          </Container>
          <Container className="content">
            {this.state.create ? (
              <Container className="createRoom">
                <Form className="roomForm">
                  
                </Form>
              </Container>
            ) : (
              <React.Fragment />
            )}
            this chat
          </Container>
        </Container>
      </Container>
    );
  }
}
