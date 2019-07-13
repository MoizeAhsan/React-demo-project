import React from "react";
import "./App.css";
import Header from "./HeaderComponent";
import { Container, Row, Col } from "react-bootstrap";
import Box from "./BoxContainer";
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      QuestionsArray: [],
      length: 0,
      currentIndex: null
    }
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);

  }
  componentDidMount() {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple", {
      method: "get"
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log(data)
        this.setState((prevState) => {
          let results = [...data.results];
          results.map((x) => {
            x.options = [...x.incorrect_answers, x.correct_answer]
            return x;
          })
          prevState.QuestionsArray = results;
          prevState.length = data.results.length;
          prevState.currentIndex = 0;
          return prevState;

        })
      })
  }
  incrementCounter() {
    this.setState((prevState) => {
      return {
        currentIndex: Math.min(prevState.currentIndex + 1, this.state.length - 1)
      }
    })
  }
  decrementCounter() {
    this.setState((prevState) => {
      console.log(Math.max(prevState.currentIndex - 1, 0));
      return {
        currentIndex: Math.max(prevState.currentIndex - 1, 0)
      }
    })
  }
  componentWillUnmount() {
    console.log('asdf')
  }
  render() {
    return (
      <div className="App">
        {/* Header */}
        <Header />
        {/* Body Start */}
        <Container fluid={true}>
          <hr />
          <Row>
            <Col sm={12} lg={12}>
              {/* HERE GOES BOX CONTAINER */}
              <Box
                question={
                  this.state.length ? this.state.QuestionsArray[this.state.currentIndex].question : ""
                }
                answerList={
                  this.state.length ? this.state.QuestionsArray[this.state.currentIndex].options : []
                }
                incrementCounter={this.incrementCounter}
                decrementCounter={this.decrementCounter}
                canBack={this.state.currentIndex === 0}
                canForward={this.state.currentIndex !== this.state.length - 1}
              ></Box>
            </Col>
          </Row>
          <hr />
        </Container>
      </div>
    );

  }
}

export default App;
