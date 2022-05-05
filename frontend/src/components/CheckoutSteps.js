import React from 'react';
import { Row, Col } from 'react-bootstrap'


export default function CheckoutSteps(props) {
    return (
        <Row className="checkout-steps">
            <Col className={props.step2 ? 'active' : ''}>Shipping Info</Col>
            <Col className={props.step3 ? 'active' : ''}>Payment Method</Col>
            <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
        </Row>
    );
}
