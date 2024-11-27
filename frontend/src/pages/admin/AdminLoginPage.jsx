import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup, Card, Container, Navbar  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import FormContainer from '../../components/FormContainer';
import Meta from '../../components/Meta';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/admin/dashboard';

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await login({ email, password, remember }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/admin/dashboard');
      toast.success('Login successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <main
        className='d-flex position-relative flex-column justify-content-center align-items-center'
        style={{ backgroundColor: '#E5E1DA', minHeight: '100vh' }}
      >
        <Meta title={'Admin Sign In'} />
        <Navbar
      style={{
        background: 'linear-gradient(45deg, #89A8B2, #B3C8CF)',
        color: '#E5E1DA',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      expand='md'
      collapseOnSelect
      className='fixed-top'
    >
      <Container fluid className="position-relative">
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#FFFFFF',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
            padding: '5px 15px',
          }}
        >
          Admin Panel
        </div>

        {/* Brand Section */}
        <LinkContainer to='/admin/dashboard'>
          <Navbar.Brand style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F1F0E8' }}>
            <img src="../BuyIT.png" alt="BuyIT Admin" style={{ height: '40px', marginRight: '10px' }} />
          </Navbar.Brand>
        </LinkContainer>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        </Container>
        </Navbar>
        <FormContainer>
          <Card
            className='p-3 p-md-5'
            style={{
              backgroundColor: '#F1F0E8',
              border: 'none',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h1 className='mb-5 text-center' style={{ color: '#89A8B2' }}>
              Sign In
            </h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label style={{ color: '#89A8B2' }}>Email address</Form.Label>
                <Form.Control
                  type='email'
                  value={email}
                  placeholder='Enter email'
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    backgroundColor: '#E5E1DA',
                    borderColor: '#B3C8CF',
                    color: '#333',
                  }}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='password'>
                <Form.Label style={{ color: '#89A8B2' }}>Password</Form.Label>
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
                    }}
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    id='togglePasswordVisibility'
                    style={{
                      cursor: 'pointer',
                      backgroundColor: '#B3C8CF',
                      borderColor: '#B3C8CF',
                    }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className='mb-3' controlId='checkbox'>
                <Form.Check
                  type='checkbox'
                  label='Keep me signed in.'
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  style={{ color: '#89A8B2' }}
                />
              </Form.Group>
              <Button
                className='my-3 w-100'
                variant='warning'
                type='submit'
                disabled={isLoading}
                style={{
                  backgroundColor: '#89A8B2',
                  borderColor: '#89A8B2',
                  color: '#F1F0E8',
                }}
              >
                Sign In
              </Button>
            </Form>
          </Card>
        </FormContainer>
      </main>
      <Footer />
    </>
  );
};


export default AdminLoginPage;
