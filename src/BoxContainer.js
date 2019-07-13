import React, { Component } from 'react';
import { Container, Jumbotron, Button, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

class Box extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: null,
            answerString: ""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClick(idx, answerString) {
        this.setState(() => {
            return {
                selectedIndex: idx,
                answerString
            }
        })
    }
    handleSubmit() {
        if (this.props.isAnswered) {
            this.props.incrementCounter();
        }
        if (this.state.selectedIndex !== null) {
            let idx = this.props.currentQuesitonIndex;
            this.props.setAnswered(idx, this.state.answerString)
            this.setState(() => {
                return {
                    selectedIndex: null,
                    answerString: "",
                }
            })
        }

    }
    render() {
        const setVariantClass = (answer) => {
            if (this.props.isAnswered) {
                if (answer === this.props.answerString) {
                    if (answer === this.props.correct_answer) return "correct"
                    return "incorrect"
                }
                if (answer === this.props.correct_answer) {
                    return "correct"
                }
            }
            return ""
        }
        const answerList = this.props.answerList ? this.props.answerList.map((x, idx) => {
            return (
                <ListGroupItem
                    key={idx}
                    active={this.state.selectedIndex === null ? false : this.state.selectedIndex === idx ? true : false}
                    disabled={this.props.isAnswered}
                    className={setVariantClass(x)}
                    onClick={() => { this.handleClick(idx, x) }}>{x}</ListGroupItem>
            )
        }) : <h1> Loading...</h1>

        let SubmitButton = true;
        if (!this.props.isAnswered && (this.state.selectedIndex !== null)) {
            SubmitButton = false; // do not disable
        }
        if (this.props.isAnswered && this.props.canForward) {
            SubmitButton = false; // do not disable
        }

        return (
            <Container>
                <Jumbotron fluid>
                    {this.props.question}
                    <ListGroup>
                        {
                            answerList
                        }
                    </ListGroup>
                </Jumbotron>
                <Col >
                    <Button
                        className="col-xs-12 col-sm-6 col-lg-6"
                        onClick={this.props.decrementCounter}
                        disabled={this.props.canBack}>Back</Button>
                    <Button
                        className='col-xs-12 col-sm-6 col-lg-6'
                        variant='success'
                        onClick={this.handleSubmit}
                        disabled={SubmitButton}>{this.props.isAnswered ? "Next" : "Submit"}</Button>
                </Col>
            </Container >
        );
    }
}

export default Box;