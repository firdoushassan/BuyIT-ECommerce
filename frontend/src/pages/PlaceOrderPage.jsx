import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Button, ListGroup, Card, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import CheckoutSteps from '../components/CheckoutSteps';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';

const PlaceOrderPage = () => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = useSelector(state => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
    if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Meta title={'Place Order'} />
      <h1 style={{ color: "#89A8B2" }}>Place Order</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
            <h2>Shipping</h2>
            <div className="mb-3">
            <strong>Address:</strong> {shippingAddress.address},{' '}
              {shippingAddress.city}, {shippingAddress.postalCode},{' '}
              {shippingAddress.country}
            </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method </h2>
              <div className="mb-3">
              <strong>Method:</strong> {paymentMethod}
              </div>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: "#E5E1DA" , marginBottom: "15px"}}>
              <h2>Order Items </h2>
              <ListGroup variant='flush'>
                {cartItems.map(item => (
                  <ListGroup.Item key={item._id} style={{ backgroundColor: "#F1F0E8" }}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={6}>
                        <Link
                          to={`/product/${item._id}`}
                          className='product-title text-dark'
                          style={{ textDecoration: 'none' }}
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x {addCurrency(item.price)} ={' '}
                        {addCurrency(item.qty * item.price)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item style={{ backgroundColor: "#F1F0E8" }}>
                <h2 style={{ color: '#89A8B2' }}>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "#E5E1DA" }}>
                <Row>
                  <Col>Items:</Col>
                  <Col>{addCurrency(Number(itemsPrice))}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "#E5E1DA" }}>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{addCurrency(Number(shippingPrice))}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "#E5E1DA" }}>
                <Row>
                  <Col>Tax:</Col>
                  <Col>{addCurrency(Number(taxPrice))}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "#E5E1DA" }}>
                <Row>
                  <Col>Total:</Col>
                  <Col>{addCurrency(Number(totalPrice))}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "#F1F0E8" }}>
                <Button
                  className='w-100'
                  disabled={cartItems.length === 0 || isLoading}
                  onClick={placeOrderHandler}
                  style={{ marginBottom: "10px", backgroundColor: '#89A8B2', borderColor: '#E5E1DA' }}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
