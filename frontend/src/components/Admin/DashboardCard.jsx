import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const DashboardCard = ({ title, icon, value, bgColor }) => {

  return (
    <div
      className="d-flex flex-column w-100"
      style={{
        margin: '10px',
        padding: '0',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Card
        className="p-4 text-light"
        style={{
          backgroundColor: '#89A8B2',
          boxShadow: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          margin: '0',
          borderRadius: '0px',
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#B3C8CF';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#89A8B2';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <Row className="m-0 w-100">
          <Col
            xs={12} sm={4} md={3}
            className="d-flex justify-content-center mb-3 mb-md-0"
            style={{
              fontSize: '36px',
              color: '#F1F0E8',
            }}
          >
            {icon}
          </Col>
          <Col
            xs={12} sm={8} md={9}
            className="text-center text-md-left"
            style={{
              paddingLeft: '15px',
            }}
          >
            <Card.Title
              style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#F1F0E8',
                marginBottom: '8px',
              }}
            >
              {title}
            </Card.Title>
            <Card.Title
              style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#E5E1DA',
                marginTop: '5px',
              }}
            >
              <strong>{value}</strong>
            </Card.Title>
          </Col>
        </Row>
      </Card>
    </div>
  );
};  

export default DashboardCard;
