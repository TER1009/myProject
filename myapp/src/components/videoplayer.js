import React, { Component } from "react";
import { Card, Container, FormControl, InputGroup } from "react-bootstrap";
import { url } from "./urlvideos";
import logIn from "./../pages/logIn";

export default class Videoplayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: url[0],
    };
  }
  render() {
    return (
      <div>
        <Container className="video-player">
          <Card className="player">
            <Container className="number-episod">
              {/* <span className='input-group-text'>№ серии</span>
              <input aria-label="Small" aria-describedly="inputGroup-sizing-sm" class="input-group-add-text form-control"/> */}
              <InputGroup>
                <InputGroup.Text>№ серии</InputGroup.Text>
                <FormControl
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/gi, "")
                      .replace(/^0+/, "");
                    if (!isNaN(e.target.value)) {
                      if (e.target.value >= 1 && e.target.value <= 9)
                        this.setState({ path: url[e.target.value - 1] });
                      else if (e.target.value < 1) {
                        {
                          this.setState({ path: url[0] });
                          //e.target.value = 1;
                        }
                      } else if (e.target.value > 9) {
                        this.setState({ path: url[8] });
                        //e.target.value = 9;
                      }
                    }
                  }}
                />
              </InputGroup>
            </Container>
            <Card.Body>
              <iframe
                width="640"
                height="384"
                src={this.state.path}
                frameBorder="0"
                scrolling="no"
                allowFullScreen
              />
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
