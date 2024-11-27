import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await login({ email, password, remember }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success('Login successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <FormContainer>
      <Meta title={'Sign In'} />
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler} style={{ backgroundColor: '#F1F0E8', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
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
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='checkbox'>
              <Form.Check
                type='checkbox'
                label='Keep me signed in.'
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
            </Form.Group>
          </Col>
          <Col className='text-end'>
            <Link to={'/reset-password'} className=' mx-2'>
              Forgot password?
            </Link>
          </Col>
        </Row>
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
          Sign In
        </Button>
      </Form>
      <Row className='text-end mt-2'>
        <Col>
          Are you a new Customer?
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className=' mx-2'
          >
            Register Now
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
