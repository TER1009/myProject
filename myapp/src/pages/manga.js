import React, { Component } from "react";
import CheckLogin from "../components/checkLogin";
import "../styles/mangastyle.css";

export default class Manga extends Component {
  render() {
    return (
      <div>
        <CheckLogin />
        Manga
        <iframe src="https://remanga.org/manga/one_piece/ch18953" />
      </div>
    );
  }
}
