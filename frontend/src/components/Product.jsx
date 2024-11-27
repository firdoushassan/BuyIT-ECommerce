import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCurrency } from '../utils/addCurrency';
import { addToCart } from '../slices/cartSlice';
import Rating from './Rating';

const Product = ({ product }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };
  return (
    <Card
      className='my-3 p-3 rounded text-center'
      style={{
        backgroundColor: '#E5E1DA', 
        border: 'none',
      }}
    >
      <Link
        to={`/product/${product._id}`}
        style={{
          textDecoration: 'none',
          color: '#89A8B2',
        }}
      >
        <Card.Img
          variant='top'
          src={product.image}
          style={{
            height: '200px',
            objectFit: 'contain',
            borderRadius: '10px',
          }}
        />
        <Card.Body>
          <Card.Title as='div' className='product-title'>
            <strong style={{ color: '#89A8B2' }}>{product.name}</strong>
          </Card.Title>
  
          <Card.Text as='div' className='mb-3'>
            <Rating
              value={product.rating}
              text={`(${product.numReviews} reviews)`}
              style={{
                color: '#7AC6E1',
              }}
            />
          </Card.Text>
          <Card.Text as='h3' style={{ color: '#6482AD' }}>
            {addCurrency(product.price)}
          </Card.Text>
        </Card.Body>
      </Link>
      <Button
        variant='warning'
        type='button'
        disabled={product.countInStock === 0}
        onClick={addToCartHandler}
        style={{
          backgroundColor: '#7AC6E1', 
          borderColor: '#7AC6E1', 
          color: '#F1F0E8', 
          fontWeight: 'bold',
        }}
      >
        Add To Cart
      </Button>
    </Card>
  );
};  

export default Product;
