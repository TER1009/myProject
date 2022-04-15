import React, { Component } from "react";
import CheckLogin from "../components/checkLogin";
import TextEditorComponent from "../components/textEditorComponent";
import "bootstrap/dist/css/bootstrap.css";

export default class Characters extends Component {

  render() {
    return (
      <>
        <CheckLogin />

        <TextEditorComponent />
      </>
    );
  }
}
