import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Badge, InputGroup, Form} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';

const Header = () => {
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());

      navigate('/login');
      toast.success('Logout successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Navbar
      style={{
        background: 'linear-gradient(45deg, #89A8B2, #B3C8CF)',
        color: '#E5E1DA',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '50px',
        fontWeight: 'bold'
      }}
      expand='md'
      collapseOnSelect
      className='fixed-top z-2'
    >
      <Container>

        <LinkContainer to='/'>
          <Navbar.Brand style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F1F0E8' }}>
            <img src="/BuyIT.png" alt="BuyIT" style={{ height: '40px', marginRight: '10px' }} />
          </Navbar.Brand>
        </LinkContainer>
        

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        

        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto align-items-center'>
          <SearchBox/>
          
            <LinkContainer to='/cart'>
                <Nav.Link className='d-flex align-items-center' style={{ color: '#F1F0E8', position: 'relative' }}>
    <FaShoppingCart style={{ marginRight: '5px', fontSize: '1.2rem' }} />
    <span>Cart</span>
    {cartItems.length > 0 && (
      <Badge
        pill
        bg='warning'
        style={{
          marginLeft: '5px',
          color: '#333',
          position: 'relative',
          top: '-7px',
          right: '-5px',
          left: '-7px',
          fontSize: '0.8rem',
        }}
      >
        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
      </Badge>
    )}
  </Nav.Link>
</LinkContainer>

            {userInfo ? (
              <NavDropdown
                title={<span style={{ color: '#F1F0E8' }}>Hello👋, {userInfo.name}</span>}
                id='username'
                menuVariant='light'
                style={{
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link style={{ color: '#F1F0E8' }}>
                  <FaUser style={{ marginRight: '5px', fontSize: '1.2rem' }} />
                  Sign In
                </Nav.Link>
              </LinkContainer>
            )}


            {userInfo && userInfo.isAdmin && (
              <NavDropdown
                title={<span style={{ color: '#F1F0E8' }}>Admin</span>}
                id='adminmenu'
                menuVariant='light'
              >
                <LinkContainer to='/admin/product-list'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/order-list'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/user-list'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
