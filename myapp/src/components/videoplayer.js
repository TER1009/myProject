import React, { Component } from "react";
import {
  Button,
  Card,
  Container,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { url } from "./urlvideos";
import logIn from "./../pages/logIn";
import "../styles/videoPlayerStyle.css";

export default class Videoplayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: url[0],
      sources: [],
    };
  }

  getSources = async () => {
    let _body = { index: document.querySelector("#getButton").value };
    await fetch("https://localhost:5001/api/pages/getVideo", {
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
        this.setState({ sources: result });
        console.log(result);
      });
    });
  };

  render() {
    return (
      <div>
        <Container className="video-player">
          <Container className="player">
            <Container className="number-episod">
              <span className="input-group-text">№ серии</span>
              <input
                id="getSource"
                aria-label="Small"
                aria-describedly="inputGroup-sizing-sm"
                class="input-group-add-text form-control"
                onChange={(e) => {
                  e.target.value = e.target.value
                    .replace(/\D/gi, "")
                    .replace(/^0+/, "");
                }}
              />
              <Button
                className={"searchButton"}
                onClick={() => {
                  if (document.querySelector("#getSource").value !== "") {
                    document
                      .querySelector("._iframe")
                      .setAttribute(
                        "src",
                        "https://srv.anipower.ru/One_Piece/OP_" +
                          document.querySelector("#getSource").value +
                          ".mp4"
                      );
                  }
                }}
              >
                Найти серию
              </Button>
            </Container>
            <Container className="video">
              <iframe
                className="_iframe"
                width="640"
                height="384"
                //src={this.state.path}
                itemType="video/mp4"
                src={""}
                frameBorder="0"
                scrolling="no"
                allowFullScreen
              />
            </Container>
          </Container>
        </Container>
      </div>
    );
  }
}
