import React, { Component } from 'react';
import { Container, Jumbotron, Button, Col } from 'react-bootstrap';

class Box extends Component {
    render() {
        return (
            <Container>
                <Jumbotron fluid>
                    {this.props.question}
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