import React, { Component } from "react";
import "../styles/EditorStyle.css";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Container, Form } from "react-bootstrap";
import "../styles/charactersStyle.css";
import { render } from "@testing-library/react";

const modules = {
  toolbar: ["bold", "italic", "underline", "link", "clean"],
};

export default class TextEditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlFile: "",
      file: "",
      text: "",
    };
  }

  componentDidMount() {
    console.log(this.state.text);
  }

  handleChange = (value) => {
    this.setState(
      (this.state = {
        text: value,
      })
    );
    console.log(this.state.text);
  };

  download = (e) => {
    this.setState(
      (this.state = {
        urlFile: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      })
    );
    console.log(this.state.urlFile);
    console.log(this.state.file);
  };
  render() {
    return (
      <div className="TextEditorComponentv">
        <Container>
          <Form.Group className="downloadPicture">
            <Form.Label className="textDownloadPicture">
              Выберите картинку
            </Form.Label>
            <Form.Control
              accept="image/*"
              onChange={this.download}
              type="file"
            ></Form.Control>
          </Form.Group>
        </Container>
        <Container className="pages"></Container>
        <Container className="imgContainer">
          {this.state.urlFile === "" ? (
            <></>
          ) : (
            <img
              className="img"
              src={this.state.urlFile}
              alt="Загрузите картинку!"
            />
          )}
        </Container>
        <Container className="containerEditor">
          <ReactQuill
            value={this.state.text}
            onChange={this.handleChange}
            modules={modules}
          />
        </Container>
        <Container className="post">
          <Button>Сохранить</Button>
        </Container>
      </div>
    );
  }
}
