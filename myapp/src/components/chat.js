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
      rooms: [],
      myRoom: [],
      create: false,
      body: "",
      online: false,
      update: false,
      timer: "",
    };
  }

  create = async () => {
    let body;
    fetch("https://localhost:5001/api/chat/roomsGet", {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((result) => {
        if (result.length > this.state.rooms.length)
          this.setState({ rooms: result.reverse(), update: true });
        else this.setState({ update: false });
        console.log(result);
      });
    });
  };

  changeCreate = async (_status) => {
    await this.setState({ create: _status });
  };

  componentDidUpdate() {
    // let block = document.querySelector(".chatBody");
    // if (block.style.display === "inline" && this.state.online !== true)
    //   this.setState({ online: true });
    // console.log("online " + this.state.online);
  }
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Container className="chatMain">
        <p
          className="chatButton"
          onClick={async () => {
            let block = document.querySelector(".chatBody");
            if (block.style.display !== "none") {
              block.style.display = "none";
              await this.setState({ online: false });
              clearInterval(this.state.timer);
              console.log("online " + this.state.online);
            } else {
              block.style.display = "inline";
              await this.setState({
                online: true,
                timer: setInterval(() => {
                  this.create();
                }, 500),
              });
              console.log("online " + this.state.online);
            }
          }}
        >
          Чат
        </p>
        <Container style={{ display: "none" }} className="chatBody">
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
                <Room onCreate={this.changeCreate} create={true} />
              </React.Fragment>
            ) : (
              <React.Fragment />
            )}
            {this.state.online &&
              this.state.rooms.map((room) => (
                <React.Fragment>
                  <Room
                    create={false}
                    key={room.id}
                    topic={room.topic}
                    owner={room.owner}
                  />
                </React.Fragment>
              ))}
          </Container>
        </Container>
      </Container>
    );
  }
}
