import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Container fluid className="bg-dark text-light py-4">
      <Row>
        <Col className="text-center">
          <span style={{ color: '#F1F0E8' }}>BuyIT - Firdous &copy; {currentYear}</span>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
