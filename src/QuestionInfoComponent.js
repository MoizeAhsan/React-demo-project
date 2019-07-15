import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

function InfoBar(props) {
    return (
        <Container fluid={true}>
            <Row>
                <Col xs='12' sm='12' lg='3'>
                    Question: {props.currentQuestion} of {props.totalQuestions}
                </Col>
                <Col xs='12' sm='12' lg={{ span: 3, offset: 6 }}>
                    Correct answers: {props.totalCorrect || 0}
                </Col>
            </Row>
        </Container>
    )
}
export default InfoBar;