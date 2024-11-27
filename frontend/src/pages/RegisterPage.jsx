import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector(state => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success('Registration successful. Welcome!');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <FormContainer>
      <Meta title={'Register'} />
      <h1>Register</h1>
      <Form onSubmit={submitHandler} style={{ backgroundColor: '#F1F0E8', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label style={{ color: '#333', fontWeight: 'bold' }}>Name</Form.Label>
          <Form.Control
            value={name}
            type='text'
            placeholder='Enter name'
            onChange={e => setName(e.target.value)}
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
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label style={{ color: '#333', fontWeight: 'bold' }}>Email address</Form.Label>
          <Form.Control
            value={email}
            type='email'
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
          Register
        </Button>
      </Form>
      <Row className='text-end mt-2'>
        <Col>
          Already have an account?
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className=' mx-2'
          >
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
