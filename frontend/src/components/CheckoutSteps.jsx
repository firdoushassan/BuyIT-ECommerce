import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignInAlt, FaShippingFast, FaCreditCard, FaClipboardCheck } from 'react-icons/fa';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const stepStyle = {
    padding: '15px 25px',
    borderRadius: '10px',
    margin: '0 15px',
    backgroundColor: '#B3C8CF',
    textAlign: 'center',
    fontSize: '1rem',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    cursor: 'pointer',
  };

  const activeStyle = {
    backgroundColor: '#7AC6E1', 
    transform: 'scale(1.05)',
  };

  const completedStyle = {
    backgroundColor: '#68C7A3',
    color: 'white',
  };

  const disabledStyle = {
    color: '#FFFFFF',
    cursor: 'not-allowed',
  };

  return (
    <Nav className="justify-content-center mb-4">
      {/* Step 1: Sign In */}
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link
              style={{
                ...stepStyle,
                ...(step1 ? activeStyle : {}),
                ...(step1 ? {} : completedStyle),
              }}
            >
              <FaSignInAlt size={20} />
              <div>Sign In</div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={{ ...stepStyle, ...disabledStyle }} disabled>
            <FaSignInAlt size={20} />
            <div>Sign In</div>
          </Nav.Link>
        )}
      </Nav.Item>

      {/* Step 2: Shipping */}
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link
              style={{
                ...stepStyle,
                ...(step2 ? activeStyle : {}),
                ...(step2 ? {} : completedStyle),
              }}
            >
              <FaShippingFast size={20} />
              <div>Shipping</div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={{ ...stepStyle, ...disabledStyle }} disabled>
            <FaShippingFast size={20} />
            <div>Shipping</div>
          </Nav.Link>
        )}
      </Nav.Item>

      {/* Step 3: Payment */}
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link
              style={{
                ...stepStyle,
                ...(step3 ? activeStyle : {}),
                ...(step3 ? {} : completedStyle),
              }}
            >
              <FaCreditCard size={20} />
              <div>Payment</div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={{ ...stepStyle, ...disabledStyle }} disabled>
            <FaCreditCard size={20} />
            <div>Payment</div>
          </Nav.Link>
        )}
      </Nav.Item>

      {/* Step 4: Place Order */}
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/place-order">
            <Nav.Link
              style={{
                ...stepStyle,
                ...(step4 ? activeStyle : {}),
                ...(step4 ? {} : completedStyle),
              }}
            >
              <FaClipboardCheck size={20} />
              <div>Place Order</div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={{ ...stepStyle, ...disabledStyle }} disabled>
            <FaClipboardCheck size={20} />
            <div>Place Order</div>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
