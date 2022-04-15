import React, { Component } from "react";
import { Container } from "react-bootstrap";
import TextEditorComponent from "../components/textEditorComponent";

export default class CreatePage extends Component {
  render() {
    return (
      <Container>
        <TextEditorComponent />
      </Container>
    );
  }
}
