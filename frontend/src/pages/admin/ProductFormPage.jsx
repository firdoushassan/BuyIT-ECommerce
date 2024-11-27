import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation
} from '../../slices/productsApiSlice';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';

const ProductFormPage = () => {
  const { id: productId } = useParams();

  const isUpdateMode = !!productId;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const getProductQueryResult = useGetProductDetailsQuery(productId);

  const {
    data: product,
    isLoading,
    error
  } = isUpdateMode
    ? getProductQueryResult
    : { data: null, isLoading: false, error: null };

  const [createProduct, { isLoading: isCreateProductLoading }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdateProductLoading }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: isUploadImageLoading }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdateMode && product) {
      setName(product.name);
      setImage(product.image);
      setDescription(product.description);
      setBrand(product.brand);
      setCategory(product.category);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [isUpdateMode, product]);

  const uploadFileHandler = async e => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.imageUrl);
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const productData = {
        name,
        image,
        description,
        brand,
        category,
        price,
        countInStock
      };
      if (isUpdateMode) {
        const { data } = await updateProduct({
          productId,
          ...productData
        });
        toast.success(data.message);
      } else {
        const { data } = await createProduct(productData);

        toast.success(data.message);
      }
      navigate('/admin/product-list');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Meta title={'Product Form'} />
      <Link to='/admin/product-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      {(isUpdateProductLoading ||
        isCreateProductLoading ||
        isUploadImageLoading) && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <FormContainer>
          <h2>
            {isUpdateMode ? 'Update Product' : 'Create Product'}
          </h2>
          <Card className='p-3 p-md-5' style={{ backgroundColor: '#F1F0E8' }}>
            <Form onSubmit={submitHandler}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId='name'>
                    <Form.Label style={{ color: '#333', fontWeight: 'bold'}}>Name</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter name'
                      value={name}
                      onChange={e => setName(e.target.value)}
                      style={{
                        backgroundColor: '#E5E1DA',
                        borderColor: '#B3C8CF',
                        color: '#333',
                        padding: '10px',
                        borderRadius: '4px',
                        boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId='price'>
                    <Form.Label style={{ color: '#333', fontWeight: 'bold' }}>Price</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter price'
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      style={{
                        backgroundColor: '#E5E1DA',
            borderColor: '#B3C8CF',
            color: '#333',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId='image'>
                    <Form.Label style={{ color: '#333', fontWeight: 'bold'}}>Image</Form.Label>
                    <Form.Control
                      type='file'
                      onChange={uploadFileHandler}
                      style={{
                        backgroundColor: '#E5E1DA',
            borderColor: '#B3C8CF',
            color: '#333',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId='brand'>
                    <Form.Label style={{ color: '#333', fontWeight: 'bold' }}>Brand</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter brand'
                      value={brand}
                      onChange={e => setBrand(e.target.value)}
                      style={{
                        backgroundColor: '#E5E1DA',
            borderColor: '#B3C8CF',
            color: '#333',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId='countInStock'>
                    <Form.Label style={{ color: '#333', fontWeight: 'bold' }}>Count In Stock</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter countInStock'
                      value={countInStock}
                      onChange={e => setCountInStock(e.target.value)}
                      style={{
                        backgroundColor: '#E5E1DA',
            borderColor: '#B3C8CF',
            color: '#333',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId='category'>
                    <Form.Label style={{ color: '#333', fontWeight: 'bold' }}>Category</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter category'
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      style={{
                        backgroundColor: '#E5E1DA',
            borderColor: '#B3C8CF',
            color: '#333',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group controlId='description'>
                    <Form.Label style={{ color: '#333', fontWeight: 'bold'}}>Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      type='text'
                      placeholder='Enter description'
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      style={{
                        backgroundColor: '#E5E1DA',
            borderColor: '#B3C8CF',
            color: '#333',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Button
              className="mb-3 w-100"
                type='submit'
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
                {isUpdateMode ? 'Update Product' : 'Create Product'}
              </Button>
            </Form>
          </Card>
        </FormContainer>
      )}
    </>
  );
};

export default ProductFormPage;
