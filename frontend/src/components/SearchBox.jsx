import React, { useState } from 'react';
import {
  Form,
  Button,
  InputGroup,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { searchProduct, clearSearch } from '../slices/searchProductSlice';

function SearchBox() {
  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  const searchProductHandler = e => {
    e.preventDefault();
    dispatch(searchProduct(input));
  };

  const clearSearchHandler = () => {
    dispatch(clearSearch());
    setInput('');
  };
  return (
    <Form onSubmit={searchProductHandler} className='d-flex'>
      <InputGroup style={{ marginRight: '20px', width: '250px' }}>
        <Form.Control
          size='sm'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Search Products...'
          style={{
            borderRadius: '20px 0 0 20px',
            borderColor: '#E5E1DA',
            boxShadow: 'none',
          }}
        />
        {input === '' ? (
          ''
        ) : (
          <Button
            type='button'
            variant='light'
            onClick={clearSearchHandler}
            style={{
              backgroundColor: '#B3C8CF',
              borderColor: '#B3C8CF',
              color: '#333',
            }}
          >
            <FaTimes />
          </Button>
        )}
        <Button
          type='submit'
          variant='warning'
          style={{
            backgroundColor: '#89A8B2',
            borderColor: '#89A8B2',
            color: '#F1F0E8',
            fontWeight: 'bold',
          }}
        >
          <FaSearch />
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBox;
