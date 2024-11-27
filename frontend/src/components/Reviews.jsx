import React from 'react';
import Message from './Message';
import { Link } from 'react-router-dom';
import { Button, Form, ListGroup } from 'react-bootstrap';
import Rating from './Rating';

const Reviews = ({
  product,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  loading
}) => {
  return (
    <>
      <h2 style={{ color: '#333', fontSize: '1.75rem', marginBottom: '20px' }}>Reviews</h2>

      {product.reviews.length === 0 && <Message>No Reviews</Message>}

      <ListGroup variant='flush'>
        {product.reviews.map((review) => (
          <ListGroup.Item key={review._id} style={{ backgroundColor: '#E5E1DA', marginBottom: '10px' }}>
            <strong style={{ color: '#333', fontSize: '1.1rem' }}>{review.name}</strong>
            <Rating value={review.rating} />
            <p style={{ color: '#666' }}>{new Date(review.createdAt).toDateString()}</p>
            <p style={{ color: '#333' }}>{review.comment}</p>
          </ListGroup.Item>
        ))}

        <ListGroup.Item style={{ backgroundColor: '#E5E1DA', marginTop: '20px', marginBottom: '15px'}}>
          <h2 style={{ color: '#333', fontSize: '1.75rem' }}>Write a Customer Review</h2>

          {userInfo ? (
            <Form onSubmit={submitHandler}>
              <Form.Group className='my-2' controlId='rating'>
                <Form.Label style={{ color: '#333' }}>Rating</Form.Label>
                <Form.Control
                  as='select'
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  style={{ backgroundColor: '#F1F0E8', borderColor: '#89A8B2' }}
                >
                  <option value=''>Select...</option>
                  <option value='1'>1 - Poor</option>
                  <option value='2'>2 - Fair</option>
                  <option value='3'>3 - Good</option>
                  <option value='4'>4 - Very Good</option>
                  <option value='5'>5 - Excellent</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className='my-2' controlId='comment'>
                <Form.Label style={{ color: '#333' }}>Comment</Form.Label>
                <Form.Control
                  as='textarea'
                  rows='3'
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ backgroundColor: '#F1F0E8', borderColor: '#89A8B2' }}
                ></Form.Control>
              </Form.Group>

              <Button
                className='w-100'
                disabled={loading}
                type='submit'
                variant='warning'
                style={{
                  backgroundColor: '#89A8B2',
                  borderColor: '#89A8B2',
                  color: '#F1F0E8',
                  fontWeight: 'bold',
                }}
              >
                Submit
              </Button>
            </Form>
          ) : (
            <Message>
              Please <Link to='/login' style={{ color: '#0DCAF0' }}>sign in</Link> to write a review
            </Message>
          )}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
export default Reviews;
