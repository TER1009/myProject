import PropTypes from "prop-types";
import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";
import "../styles/chatStyle.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Room from "./room";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: [],
      myRoom: [],
      create: false,
      body: "",
    };
  }

  create = async () => {
    let body;
    fetch("", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: "",
    });
  };

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
            <Container className="add">
              <AddCircleOutlineIcon
                className="addIcon"
                onClick={() => {
                  this.setState({ create: true });
                }}
              />
            </Container>
            <Container className="all">
              <p className="allButton">Все комнаты</p>
            </Container>
            <Container className="my">
              <p className="myButton">Мои комнаты</p>
            </Container>
          </Container>
          <Container className="content">
            {this.state.create ? (
              <React.Fragment>
                <Room create={true} />
              </React.Fragment>
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
