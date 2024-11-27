import React from 'react';
import { Nav } from 'react-bootstrap';
import {
  FaCartShopping,
  FaCircleUser,
  FaGauge,
  FaPowerOff,
  FaTable,
  FaUserGroup,
  FaUsers
} from 'react-icons/fa6';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());

      navigate('/admin/login');
      toast.success('Logout successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      {[
        { to: '/admin/dashboard', icon: FaGauge, label: 'Dashboard' },
        { to: '/admin/product-list', icon: FaTable, label: 'Products' },
        { to: '/admin/order-list', icon: FaCartShopping, label: 'Orders' },
        { to: '/admin/user-list', icon: FaUsers, label: 'Users' },
        { to: '/admin/admin-list', icon: FaUserGroup, label: 'Admins' },
        { to: '/admin/profile', icon: FaCircleUser, label: 'Profile' },
      ].map((item, index) => (
        <LinkContainer to={item.to} className='mb-2' key={index}>
          <Nav.Link
            style={{
              position: 'relative',
              color: '#F1F0E8',
              backgroundColor: '#89A8B2',
              padding: '10px 15px',
              borderRadius: '8px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            className='menu-link'
          >
            <item.icon style={{ marginRight: '10px', fontSize: '18px' }} />
            {item.label}
          </Nav.Link>
        </LinkContainer>
      ))}
  
      <Nav.Link
        onClick={logoutHandler}
        style={{
          position: 'relative',
          color: '#F1F0E8',
          backgroundColor: '#89A8B2',
          padding: '10px 15px',
          borderRadius: '8px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
        }}
        className='menu-link'
      >
        <FaPowerOff style={{ marginRight: '10px', fontSize: '18px' }} />
        Logout
      </Nav.Link>
  
      <style>
        {`
          .menu-link:hover {
            background-color: #B3C8CF !important;
            transform: scale(1.02);
          }
        `}
      </style>
    </>
  );
};  
export default Sidebar;
