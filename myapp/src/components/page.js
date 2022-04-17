import React, { Component } from "react";
import "../styles/pageStyle.css";
import { Container } from "react-bootstrap";

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeSize: false,
    };
  }
  render() {
    return (
      <Container
        id={this.props.id}
        className={"content " + this.props.id}
        style={{ marginBottom: "100px" }}
      >
        <p
          id={this.props.id}
          className={"description " + this.props.id}
          onClick={() => {
            var selector = ".description " + this.props.id;
            if (!this.state.changeSize) {
              this.setState({ changeSize: true });
              let block = document.querySelector(selector);
              block.style.height = "max-content";
            } else {
              this.setState({ changeSize: false });
              let block = document.querySelector(selector);
              block.style.height = "300px";
            }
          }}
        >
          <img
            className="image"
            src={"data:" + this.props.type + ";base64," + this.props.picture}
          />
          <div dangerouslySetInnerHTML={{ __html: this.props.text }} />
        </p>
      </Container>
    );
  }
}
