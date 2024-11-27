import React from 'react';
import Meta from '../../components/Meta';
import { useAdminsQuery } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminListPage = () => {
  const { data: admins, isLoading, error } = useAdminsQuery({});

  return (
    <>
      <Row className='align-items-center mx-5'>
        <Col>
          <Meta title={'Admin List'} />
          <h1 style={{ color: '#89A8B2', }}>Admins</h1>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table
          striped
          hover
          bordered
          responsive
          size='sm'
          style={{
            backgroundColor: '#E5E1DA',
            color: '#333',
            marginLeft: '10px'
          }}
        >
          <thead style={{ backgroundColor: '#B3C8CF', color: '#F1F0E8' }}>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {admins?.map(admin => (
              <tr key={admin._id}>
                <td>{admin._id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>

                <td>
                  <LinkContainer to={`/admin/user/update/${admin._id}`}>
                    <Button
                      className='btn-sm'
                      variant='light'
                      style={{
                        backgroundColor: '#F1F0E8',
                        borderColor: '#B3C8CF',
                        color: '#333',
                      }}
                    >
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    className='btn-sm'
                    variant='light'
                    onClick={() => {}}
                  >
                    <FaTrash style={{ color: 'red' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AdminListPage;
