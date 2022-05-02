import PropTypes from "prop-types";
import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";
import "../styles/chatStyle.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UpdateIcon from "@mui/icons-material/Update";
import Room from "./room";
import ChatDialog from "./chatDialog";

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
      inroom: false,
      id: "",
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
      if (response.status == 200)
        response.json().then((result) => {
          if (
            result.length > 0 &&
            typeof result !== "undefined" &&
            result.length > this.state.rooms.length
          )
            this.setState({ rooms: result.reverse(), update: true });
          else this.setState({ update: false });
          console.log(result);
        });
    });
  };

  changeCreate = async (_status) => {
    await this.setState({ create: _status });
    this.create();
    this.collapse();
  };

  changeInroom = async () => {
    this.setState({ inroom: true });
  };

  componentDidUpdate() {
    // let block = document.querySelector(".chatBody");
    // if (block.style.display === "inline" && this.state.online !== true)
    //   this.setState({ online: true });
    // console.log("online " + this.state.online);
  }
  componentDidMount() {}

  componentWillUnmount() {}

  collapse = () => {
    let blocks = document.querySelectorAll(".room");
    console.log(blocks.length);
    if (blocks.length > 0) {
      blocks.forEach((element) => {
        element.addEventListener("click", (e) => {
          this.setState({ id: e.target.parentNode.id });
          console.log("this log ");
          this.changeInroom();
        });
      });
    }
  };

  render() {
    return (
      <Container className="chatMain">
        <p
          className="chatButton"
          onClick={async () => {
            await this.create();
            let block = document.querySelector(".chatBody");
            if (block.style.display !== "none") {
              block.style.display = "none";
              this.setState({ online: false });
              clearInterval(this.state.timer);
              console.log("online " + this.state.online);
            } else {
              block.style.display = "inline";
              this.setState({
                online: true,
              });
              setTimeout(() => {
                this.collapse();
              }, 400);
              console.log("online " + this.state.online);
            }
          }}
        >
          Чат
        </p>
        <Container style={{ display: "none" }} className="chatBody">
          <Container className="panel">
            {!this.state.inroom ? (
              <React.Fragment>
                <AddCircleOutlineIcon
                  className="addIcon"
                  onClick={() => {
                    this.setState({ create: true });
                  }}
                />
                <UpdateIcon
                  className="updateIcon"
                  onClick={() => {
                    this.create();
                    setTimeout(() => {
                      this.collapse();
                    }, 300);
                  }}
                />
              </React.Fragment>
            ) : (
              <ArrowBackIcon
                className="backIcon"
                onClick={() => {
                  this.setState({ inroom: false });
                  setTimeout(() => {
                    this.collapse();
                  }, 300);
                }}
              />
            )}
          </Container>
          <Container className="content">
            {this.state.create ? (
              <React.Fragment>
                <Room
                  onCreate={this.changeCreate}
                  create={true}
                  update={this.create}
                />
              </React.Fragment>
            ) : (
              <React.Fragment />
            )}
            {!this.state.inroom ? (
              this.state.online && this.state.rooms.length > 0 ? (
                this.state.rooms.map((room) => (
                  <React.Fragment key={room.id}>
                    <Room
                      changeInroom={this.changeInroom}
                      create={false}
                      key={room.id}
                      id={room.id}
                      topic={room.topic}
                      owner={room.owner}
                    />
                  </React.Fragment>
                ))
              ) : (
                <React.Fragment>Здесь пока ничего нет</React.Fragment>
              )
            ) : (
              <ChatDialog
                name={this.props.name}
                online={this.state.online}
                idroom={this.state.id}
              />
            )}
          </Container>
        </Container>
      </Container>
    );
  }
}
