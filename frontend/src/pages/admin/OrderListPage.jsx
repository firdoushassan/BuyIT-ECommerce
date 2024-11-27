import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaIndianRupeeSign, FaXmark } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';
import { useSelector } from 'react-redux';
import { addCurrency } from '../../utils/addCurrency';

const OrderListsPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const { userInfo } = useSelector(state => state.auth);
  
  return (
    <>
      <Meta title={'Order List'} />
      <h1 style={{ color: '#89A8B2', marginLeft: '50px' }}>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped hover bordered responsive size='sm'
        style={{
          backgroundColor: '#E5E1DA',
          color: '#333',
          marginLeft: '10px'
        }}>
          <thead style={{ backgroundColor: '#89A8B2', color: '#F1F0E8' }}>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: '#E5E1DA' }}>
            {orders?.map(order => (
              <tr key={order._id} style={{ backgroundColor: '#F1F0E8' }}>
                <td>{order.user._id}</td>
                <td>{order.user.name}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{addCurrency(order.totalPrice)}</td>
                <td>
                  {order.isPaid ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaXmark style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaXmark style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer
                    to={
                      userInfo.isAdmin
                        ? `/admin/order/${order._id}`
                        : `/order/${order._id}`
                    }
                  >
                    <Button
                      className='btn-sm'
                      variant='info'
                      style={{
                        backgroundColor: '#89A8B2',
                        color: '#F1F0E8',
                        border: 'none',
                      }}
                    >
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListsPage;
