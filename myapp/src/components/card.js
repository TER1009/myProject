import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Mycard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }
  render() {
    return (
      <>
        <Card
          className="maincard"
          style={{ width: this.props.wdht, height: this.props.hght }}
        >
          <Card.Text className="oncard-text">
            <Link
              to={this.props.src}
              className={this.props.className}
            >
              {this.props.text}
            </Link>
          </Card.Text>
        </Card>
      </>
    );
  }
}
