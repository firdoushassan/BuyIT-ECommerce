import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import {
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Image,
  Button,
  ListGroupItem
} from 'react-bootstrap';
import { FaIndianRupeeSign } from 'react-icons/fa6';

import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';
const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <>
      <Meta title={'Shopping Cart'} />
      <h1 style={{ color: '#89A8B2' }}>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty 👉 <Link to='/' style={{ color: '#89A8B2' }}>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item._id} className='my-3' style={{ backgroundColor: '#E5E1DA' }}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/product/${item._id}`}
                        className='product-title text-dark'
                        style={{ textDecoration: 'none', color: '#89A8B2' }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2} style={{ color: '#89A8B2' }}>
                      {addCurrency(item.price)}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={e => addToCartHandler(item, Number(e.target.value))}
                        style={{ backgroundColor: '#F1F0E8', border: 'none' }}
                      >
                        {Array.from({ length: item.countInStock }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item._id)}
                        style={{ color: '#F1F0E8' }}
                      >
                        <FaTrash style={{ color: 'red' }} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          {cartItems.length > 0 && (
            <Card style={{ backgroundColor: '#F1F0E8' }}>
              <ListGroup variant='flush'>
                <ListGroup.Item style={{ backgroundColor: '#F1F0E8' }}>
                  <h2 style={{ color: '#89A8B2' }}>
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h2>
                  <h3 style={{ color: '#89A8B2'}}>
                    {addCurrency(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))}
                  </h3>
                </ListGroup.Item>
                <ListGroupItem style={{ backgroundColor: '#F1F0E8' }}>
                  <Button
                    className='w-100'
                    type='button'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    style={{ backgroundColor: '#89A8B2', borderColor: '#E5E1DA' }}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
