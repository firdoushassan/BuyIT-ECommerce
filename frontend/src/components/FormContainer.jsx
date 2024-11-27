import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const FormContainer = ({ children }) => {
  return (
    <Container fluid className="bg-light py-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} lg={6} className="bg-white p-4 shadow-sm rounded">
          {children}
        </Col>
      </Row>
    </Container>
  );
};  

export default FormContainer;
