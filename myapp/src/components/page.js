import React, { Component } from "react";

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <p className="description">
          <img className="image" src={URL.createObjectURL(this.props.img)} />
          {this.props.text}
        </p>
      </div>
    );
  }
}
