import React, { Component } from 'react';
import { Container, Jumbotron, Button, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

class Box extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: null
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(idx) {
        this.setState(() => {
            return {
                selectedIndex: idx
            }
        })
    }
    render() {
        const answerList = this.props.answerList ? this.props.answerList.map((x, idx) => {
            return (
                <ListGroupItem
                    key={idx}
                    active={this.state.selectedIndex === null ? false : this.state.selectedIndex === idx ? true : false}
                    onClick={() => { this.handleClick(idx) }}>{x}</ListGroupItem>
            )
        }) : <h1> Loading...</h1>
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
                        onClick={this.props.incrementCounter}
                        disabled={!this.props.canForward}>Submit</Button>
                </Col>
            </Container >
        );
    }
}

export default Box;