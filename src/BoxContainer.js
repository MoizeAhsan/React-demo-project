import React, { Component } from 'react';
import { Container, Jumbotron, Button, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

class Box extends Component {
    render() {
        const answerList = this.props.answerList ? this.props.answerList.map((x, idx) => {
            return (
                <ListGroupItem key={idx}>{x}</ListGroupItem>
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
                    <Button className="col-xs-12 col-sm-6 col-lg-6">A</Button>
                    <Button className='col-xs-12 col-sm-6 col-lg-6' variant='success'>B</Button>
                </Col>
            </Container >
        );
    }
}

export default Box;