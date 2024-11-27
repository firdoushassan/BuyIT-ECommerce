import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';
const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector(state => state.cart);

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/place-order');
  };
  return (
    <FormContainer style={{ backgroundColor: "#E5E1DA" }}>
      <CheckoutSteps step1 step2 step3 />
      <Meta title={'Payment Method'} />
      <h1 className="text-center">Payment Method</h1>
      
      <Form onSubmit={submitHandler}>
        <div className="mb-3">
          <Form.Label as="legend" style={{ color: "#89A8B2" }}>Select Method</Form.Label>
          <Col>
            <Form.Check
              className="my-2"
              type="radio"
              id="Razorpay"
              label="Razorpay"
              name="paymentMethod"
              value="Razorpay"
              checked
              onChange={e => setPaymentMethod(e.target.value)}
              style={{ color: "#89A8B2" }}
            ></Form.Check>
          </Col>
        </div>
  
        <div className="d-flex justify-content-center">
          <Button
            className="mb-3 w-75"
            type="submit"
            style={{
              backgroundColor: "#89A8B2",
              borderColor: "#89A8B2",
              padding: "10px 20px",
              fontSize: "1rem"
            }}
          >
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default Payment;
