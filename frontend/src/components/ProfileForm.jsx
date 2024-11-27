import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useProfileMutation } from '../slices/usersApiSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from './Loader';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const { userInfo } = useSelector(state => state.auth);

  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useProfileMutation();

  const dispatch = useDispatch();

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
        return toast.error('Passwords do not match!');
      }
      const res = await updateProfile({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <Form onSubmit={submitHandler} style={{ backgroundColor: '#F1F0E8', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label style={{ color: '#333', fontWeight: 'bold' }}>Name</Form.Label>
        <Form.Control
          value={name}
          type="text"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
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

      <Form.Group className="mb-3" controlId="email">
        <Form.Label style={{ color: '#333', fontWeight: 'bold' }}>Email address</Form.Label>
        <Form.Control
          value={email}
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
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

      <Form.Group className="mb-3" controlId="password">
        <Form.Label style={{ color: '#333', fontWeight: 'bold' }}>Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
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
            id="togglePasswordVisibility"
            style={{
              cursor: 'pointer',
              backgroundColor: '#B3C8CF',
              color: '#333',
              border: 'none',
              borderRadius: '4px',
              padding: '10px',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#7AC6E1')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#B3C8CF')}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label style={{ color: '#333', fontWeight: 'bold' }}>Confirm Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            id="toggleConfirmPasswordVisibility"
            style={{
              cursor: 'pointer',
              backgroundColor: '#B3C8CF',
              color: '#333',
              border: 'none',
              borderRadius: '4px',
              padding: '10px',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#7AC6E1')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#B3C8CF')}
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Button
        className="mb-3 w-100"
        type="submit"
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
        Update
      </Button>

      {isUpdateProfileLoading && <Loader />}
    </Form>
  );
};

export default ProfileForm;
