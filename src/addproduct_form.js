import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './admin_navbar';
import { useNavigate } from 'react-router-dom';

function AddProductForm() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [productVersion, setProductVersion] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProduct = { name: productName, version: productVersion, description: productDescription };
      const response = await axios.post('http://localhost:4000/web-app/api/products', newProduct);
      console.log(response.data);

      setProductName('');
      setProductVersion('');
      setProductDescription('');
      navigate('/adminportal');

    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <form onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <div>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="productVersion">Product Version:</label>
        <input
          type="number"
          id="productVersion"
          value={productVersion}
          onChange={(e) => setProductVersion(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="productDescription">Description:</label>
        <textarea
          id="productDescription"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
    </>
  );
}

export default AddProductForm;
