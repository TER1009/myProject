import React, { Component } from "react";

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeSize: false,
    };
  }
  render() {
    return (
      <div
        className="content"
        onClick={() => {
          if (!this.state.changeSize) {
            this.setState({ changeSize: true });
            let block = document.querySelector(".content");
            block.style.height = "max-content";
          } else {
            this.setState({ changeSize: false });
            let block = document.querySelector(".content");
            block.style.height = "200px";
          }
        }}
      >
        <p className="description">
          <img className="image" src={URL.createObjectURL(this.props.img)} />
          {this.props.text}
        </p>
      </div>
    );
  }
}
