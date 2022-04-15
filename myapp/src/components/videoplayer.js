import React, { Component } from "react";
import { Card, Container, FormControl, InputGroup } from "react-bootstrap";

export default class Videoplayer extends Component {
  render() {
    return (
      <div>
        <Container className='video-player'>
          <Card className="player">
            <Card.Body >
                <iframe
                  width="640"
                  height="384"
                  src={this.props.src}
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                />
              <Container className='number-episod'>
              {/* <span className='input-group-text'>№ серии</span>
              <input aria-label="Small" aria-describedly="inputGroup-sizing-sm" class="input-group-add-text form-control"/> */}
                <InputGroup  >
                  <InputGroup.Text>№ серии</InputGroup.Text>
                  <FormControl 
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
              </Container>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
