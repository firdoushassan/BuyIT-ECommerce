import React, { useEffect, useState } from 'react';
import FormContainer from '../../components/FormContainer';
import { Button, Form , Card} from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  useUpdateUserMutation,
  useGetUserByIdQuery
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';

const UpdateUserFormPage = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);

  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const userData = { name, email, isAdmin };
      const { data } = await updateUser({ userId, ...userData });
      toast.success(data.message);
      navigate('/admin/user-list');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <Meta title={'User Update Form'} />

      <Link to='/admin/user-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      {isUpdateUserLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <FormContainer>
          <Meta title={'Update User'} />
          <h2>Update user</h2>
          <Card className='p-3 p-md-5' style={{ backgroundColor: '#F1F0E8', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='name'>
            <Form.Label style={{ color: '#333', fontWeight: 'bold'}}>Name</Form.Label>
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
              <Form.Label style={{ color: '#333', fontWeight: 'bold'}}>Email address</Form.Label>
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
            <Form.Group className='mb-3' controlId='isAdmin' style={{ color: '#333', fontWeight: 'bold'}}>
              <Form.Check
                type='checkbox'
                label='is Admin'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
                
              />
            </Form.Group>

            <Button className='mb-3 w-100'  type='submit'
            style={{
                  marginTop: '1rem',
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
          </Form>
          </Card>
        </FormContainer>
      )}
    </>
  );
};

export default UpdateUserFormPage;
