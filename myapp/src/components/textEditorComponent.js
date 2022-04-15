import React, { Component } from "react";
import "../styles/EditorStyle.css";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Container, Form } from "react-bootstrap";
import "../styles/EditorStyle.css";

const modules = {
  toolbar: ["bold", "italic", "underline", "link", "clean"],
};

export default class TextEditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlFile: "",
      file: "",
      typeContent: "",
      text: "",
      disable: false,
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

  Select = (e) => {
    this.setState((this.state = { typeContent: e.target.value }));
    console.log(e.target.value);
  };

  postPage = async () => {
    let data = {
      typeContent: this.state.typeContent,
      description: this.state.text,
      img: this.state.file,
    };
    data = JSON.stringify(data);
    console.log(data);
    fetch("https://localhost:5001/api/pages/postPage", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: data,
    })
      .then((response) => response.text())
      .then((result) => {
        //if (result.includes(true))
        console.log("editor " + result);
      });
  };

  render() {
    return (
      <div className="TextEditorComponentv">
        <Container className="mainEditor">
          <Form className="form">
            <Form.Select
              className="typeContent"
              aria-label="Default select example"
              onChange={this.Select}
            >
              <option >Выберите тип страницы</option>
              <option value="Персонаж">Персонаж</option>
              <option value="Фрукт">Фрукт</option>
              <option value="Место">Место</option>
            </Form.Select>
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
          </Form>
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
            <Button onClick={this.postPage}>Сохранить</Button>
          </Container>
        </Container>
      </div>
    );
  }
}
