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
                  this.state.length ? this.state.QuestionsArray[0].question : ""
                }
                answerList={
                  this.state.length ? this.state.QuestionsArray[0].options : []
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
