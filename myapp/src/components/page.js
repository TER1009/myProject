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

  get = (e) => {
    let blockClass = e.target.className;
    console.log(e.target.className);
    const [one, two] = blockClass.split("");
    if (blockClass !== "") {
      let block = document.querySelector("." + blockClass);
      if (!this.state.changeSize) {
        block.style.maxHeight = "max-content";
        this.setState({ changeSize: true });
      } else {
        block.style.maxHeight = "200px";
        this.setState({ changeSize: false });
      }
    }
  };

  render() {
    return (
      <Container
        key={this.props.key}
        id={this.props.id}
        className={"content " + this.props.id}
      >
        <Container className="nameContainer">
          <p className="nameText">{this.props.name}</p>
        </Container>
        <p
          id={"description"}
          className={"description" + this.props.id}
          onClick={this.get}
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
