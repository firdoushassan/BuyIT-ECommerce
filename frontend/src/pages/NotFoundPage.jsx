import React from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import Meta from '../components/Meta';

const NotFoundPage = () => {
  return (
    <Container className='position-absolute top-50 start-50 translate-middle'>
      <Meta title={'404 Not Found'} />
      <Col className='text-center'>
        <h1 className='display-1 fw-bold' style={{ color: '#89A8B2' }}>404</h1>
        <p className='fs-3'>
          <span className='text-danger'>Oops!</span> Page not found.
        </p>
        <p className='lead' style={{ color: '#89A8B2' }}>
          The page you’re looking for doesn’t exist.
        </p>
        <Button href='/' style={{
          backgroundColor: '#7AC6E1',
          color: '#F1F0E8',
          fontWeight: 'bold',
          padding: '10px',
          borderRadius: '4px',
          border: 'none',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#54B4D3')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#7AC6E1')}>
          Go Home
        </Button>
      </Col>
    </Container>
  );
};

export default NotFoundPage;
