import React, { Component } from "react";
import CheckLogin from "../components/checkLogin";
import "../styles/mangastyle.css";
import { Container } from "react-bootstrap";

export default class Manga extends Component {
  render() {
    return (
      <React.Fragment>
        <CheckLogin />
        <Container className="manga">
          <iframe src="https://remanga.org/manga/one_piece/ch18953" />
        </Container>
      </React.Fragment>
    );
  }
}
