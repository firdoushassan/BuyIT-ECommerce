import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNewPasswordRequestMutation } from '../slices/usersApiSlice';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';
import Message from '../components/Message';
import { toast } from 'react-toastify';

const ResetPasswordRequestPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [requestNewPassword, { isLoading }] = useNewPasswordRequestMutation();
  // console.log(useNewPasswordRequestMutation());
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await requestNewPassword({ email }).unwrap();
      setMessage(res.message);
      setEmail('');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <Meta title={'Request New Password'} />
      <h1>Request New Password</h1>
      {message && <Message>{message}</Message>}
      <Form onSubmit={handleSubmit} style={{ backgroundColor: '#F1F0E8', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label style={{ color: '#333', fontWeight: 'bold' }}>Email address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Enter email'
            onChange={e => setEmail(e.target.value)}
            style={{
              backgroundColor: '#E5E1DA',
              borderColor: '#B3C8CF',
              color: '#333',
              padding: '10px',
              borderRadius: '4px',
              boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
            }}
          />
        </Form.Group>
        <Button
          className='mb-3 w-100'
          type='submit'
          disabled={isLoading}
          style={{
            backgroundColor: '#7AC6E1',
            color: '#F1F0E8',
            fontWeight: 'bold',
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#54B4D3')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#7AC6E1')}
        >
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordRequestPage;
