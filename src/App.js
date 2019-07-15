import React from "react";
import "./App.css";
import Header from "./HeaderComponent";
import { Container, Row, Col, Button } from "react-bootstrap";
import Box from "./BoxContainer";
import _ from "lodash";
import InfoBar from "./QuestionInfoComponent";
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      QuestionsArray: [],
      length: 0,
      currentIndex: null,
      renderBox: false,
      correctAnswerCount: 0
    }
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.setAnswered = this.setAnswered.bind(this);
    this.renderBox = this.renderBox.bind(this);
    this.setRenderBox = this.setRenderBox.bind(this)
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
          prevState.isCorrect = false;
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
      let ans_count = prevState.correctAnswerCount
      if (selectedAnswer === questionsList[idx].correct_answer) {
        ans_count += 1;
      }
      return {
        QuestionsArray: questionsList,
        correctAnswerCount: ans_count
      }
    })
  }

  renderBox() {
    return (
      <>
        <Row>
          <InfoBar
            totalQuestions={this.state.length}
            currentQuestion={this.state.currentIndex + 1}
            totalCorrect={this.state.correctAnswerCount}
          ></InfoBar>
        </Row>
        <Row>

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
        </Row>
      </>
    )
  }

  setRenderBox(state = true) {
    this.setState({ renderBox: state })
  }

  render() {

    const Box = this.state.renderBox ? this.renderBox() :
      (<>
        <h2> A simple quiz app! </h2>
        <br></br>
        <Button size='lg' onClick={() => { this.setRenderBox(true) }}>Start!</Button>
      </>)
    return (
      <div className="App">
        {/* Header */}
        <Header />
        {/* Body Start */}
        <Container fluid={true}>
          <hr />
          <Row>
            <Col sm={12} lg={12} id="MainColumn">
              {/* HERE GOES BOX CONTAINER */}
              {Box}
            </Col>
          </Row>
          <hr />
        </Container>
      </div>
    );

  }
}

export default App;
