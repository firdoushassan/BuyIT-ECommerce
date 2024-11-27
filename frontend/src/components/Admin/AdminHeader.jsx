import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import AdminSidebar from './AdminSidebar';

const AdminHeader = () => {
  const { userInfo } = useSelector(state => state.auth);

  return (
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
            <img src="/BuyIT.png" alt="BuyIT Admin" style={{ height: '40px', marginRight: '10px' }} />
          </Navbar.Brand>
        </LinkContainer>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        {/* Collapsible Menu */}
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto align-items-center'>
            {/* Welcome Message */}
            <Nav.Link
              style={{
                color: '#F1F0E8',
                fontSize: '1rem',
                fontWeight: '500',
                marginRight: '20px',
              }}
            >
              Hello👋, {userInfo?.name}
            </Nav.Link>

            {/* Sidebar for Smaller Screens */}
            <div className='d-md-none'>
              <AdminSidebar />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


export default AdminHeader;
