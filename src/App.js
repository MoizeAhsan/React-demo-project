import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import _ from "lodash";
import "./App.css";

import Header from "./HeaderComponent";
import Box from "./BoxContainer";
import InfoBar from "./QuestionInfoComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      QuestionsArray: [],
      length: 10,
      currentIndex: null,
      renderBox: false,
      correctAnswerCount: 0,
      isLoading: false
    }
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.setAnswered = this.setAnswered.bind(this);
    this.renderBox = this.renderBox.bind(this);
    this.setRenderBox = this.setRenderBox.bind(this);
    this.setUpQuiz = this.setUpQuiz.bind(this);
  }

  componentDidMount() {

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

  setUpQuiz() {
    this.setState({ isLoading: true },
      () => {
        fetch("https://opentdb.com/api.php?amount=" + this.state.length + "&type=multiple", {
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
          }).then(() => {
            this.setRenderBox(true)
          })
      }
    )
  }
  render() {
    let Box = ""
    if (this.state.renderBox) {
      Box = this.renderBox()
    } else if (this.state.isLoading) {
      Box = (
        <h2>
          <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon> Loading...
        </h2>
      )
    } else {
      Box =
        (<>
          <h2> A simple quiz app! </h2>
          <br></br>
          <Row className='justify-content-center'>
            Number of Questions:
          <select onChange={(e) => {
              let number = parseInt(e.currentTarget.value);
              number = number || 10; // if bad input (NaN etc.) arises set default
              if (number < 0 || number > 15) number = 10; // data validation
              this.setState({ length: number })
            }}
              name='number-of-questions'
              defaultValue={10}>{
                [5, 10, 15].map((val, idx) => {
                  return (
                    <option value={val} key={idx}>{val}</option>
                  )
                })
              }
            </select>
          </Row>
          <Row className='justify-content-center'>
            <Button size='lg' onClick={this.setUpQuiz}>Start!</Button>
          </Row>
        </>)
    }
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
