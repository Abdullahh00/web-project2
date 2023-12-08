
import Navbar from './admin_navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductManagement() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/web-app/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  function handleAddProduct(){
    navigate('/addproduct');

  }

  

  if (loading) return <div>Loading...</div>;

  return (
    <div>
         <Navbar />
      <h1>Product Management</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Version</th>
            <th>Description</th>
            
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.version}</td>
              <td>{product.description}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() =>handleAddProduct()}>Add product</button>
    </div>
  );
}

export default ProductManagement;
