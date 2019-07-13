import React from "react";
import "./App.css";
import Header from "./HeaderComponent";
import { Container, Row, Col } from "react-bootstrap";
import Box from "./BoxContainer";
import _ from "lodash";
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
    this.setAnswered = this.setAnswered.bind(this);

  }
  componentDidMount() {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple", {
      method: "get"
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        this.setState((prevState) => {
          let results = [...data.results];
          results.map((x) => {
            x.options = [...x.incorrect_answers, x.correct_answer]
            // need to shuffle results
            x.options = _.shuffle(x.options)
            x.isAnswered = false;
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
      return {
        currentIndex: Math.max(prevState.currentIndex - 1, 0)
      }
    })
  }
  setAnswered(idx, selectedAnswer) {
    this.setState((prevState) => {
      let questionsList = [...prevState.QuestionsArray]
      questionsList[idx].isAnswered = true;
      questionsList[idx].answer = selectedAnswer;
      return {
        QuestionsArray: questionsList
      }
    })
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
                currentQuesitonIndex={this.state.currentIndex}
                question={
                  this.state.length ? this.state.QuestionsArray[this.state.currentIndex].question : ""
                }
                correct_answer={this.state.length ? this.state.QuestionsArray[this.state.currentIndex].correct_answer : ""
                }
                answerList={
                  this.state.length ? this.state.QuestionsArray[this.state.currentIndex].options : []
                }
                incrementCounter={this.incrementCounter}
                decrementCounter={this.decrementCounter}
                canBack={this.state.currentIndex === 0}
                canForward={this.state.currentIndex !== this.state.length - 1}
                isAnswered={this.state.length ? this.state.QuestionsArray[this.state.currentIndex].isAnswered : false
                }
                setAnswered={this.setAnswered}
                answerString={this.state.length ? this.state.QuestionsArray[this.state.currentIndex].answer : ""
                }
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
