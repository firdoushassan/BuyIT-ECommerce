import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import { addCurrency } from '../utils/addCurrency';
import Loader from './Loader';
import Message from './Message';

const ProductCarousel = () => {
  const { data: products } = useGetTopProductsQuery();
  return (
    <Carousel className='text-center bg-secondary mb-5 z-0'>
      {products?.map((product) => (
        <Carousel.Item key={product._id} interval={3000}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={{
                height: '500px',
                objectFit: 'cover', 
                borderRadius: '10px', 
              }}
            />
            <Carousel.Caption
              className='pb-5 px-5'
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px', 
                color: '#F1F0E8',
              }}
            >
              <h3 className='product-title' style={{ color: '#B3C8CF' }}>
                {product.name}
              </h3>
              <h1 style={{ color: '#7AC6E1' }}>
                {addCurrency(product.price)}
              </h1>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
