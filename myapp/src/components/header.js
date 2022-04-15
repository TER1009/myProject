import React, { Component } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as pic from "./pictures";
import "../styles/headerStyle.css";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar className="header" bg="light" expand="md">
          <Container>
            <Navbar.Brand>
              <Link to="/">
                <img src={pic.logo} height="50" width="150" alt=" " />
              </Link>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </>
    );
  }
}
