import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useResetPasswordMutation } from '../slices/usersApiSlice';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';
import { useParams } from 'react-router-dom';
import Message from '../components/Message';

const ResetPasswordPage = () => {
  const { id: userId, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      const res = await resetPassword({ userId, token, password }).unwrap();
      setPassword('');
      setConfirmPassword('');
      setMessage(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <Meta title={'Reset Password'} />
      <h1>Reset Password</h1>
      {message && <Message>{message}</Message>}
      <Form onSubmit={submitHandler} style={{ backgroundColor: '#F1F0E8', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label style={{ color: '#333', fontWeight: 'bold' }}>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder='Enter password'
              onChange={e => setPassword(e.target.value)}
              style={{
                backgroundColor: '#E5E1DA',
                borderColor: '#B3C8CF',
                color: '#333',
                padding: '10px',
                borderRadius: '4px',
                boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
              }}
            />
            <InputGroup.Text
              onClick={togglePasswordVisibility}
              id='togglePasswordVisibility'
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label style={{ color: '#333', fontWeight: 'bold' }}>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              placeholder='Confirm password'
              onChange={e => setConfirmPassword(e.target.value)}
              style={{
                backgroundColor: '#E5E1DA',
                borderColor: '#B3C8CF',
                color: '#333',
                padding: '10px',
                borderRadius: '4px',
                boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
              }}
            />
            <InputGroup.Text
              onClick={toggleConfirmPasswordVisibility}
              id='toggleConfirmPasswordVisibility'
              style={{ cursor: 'pointer' }}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
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

export default ResetPasswordPage;
