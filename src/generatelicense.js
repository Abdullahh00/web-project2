import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './admin_navbar';

function GenerateLicenseForm() {
  const [productId, setProductId] = useState('');
  const [userId, setUserId] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [activationStatus, setActivationStatus] = useState(false);
  const [products, setProducts] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLicenseId, setSelectedLicenseId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/web-app/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    const fetchLicenses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/web-app/api/licenses');
        setLicenses(response.data);
      } catch (error) {
        console.error('Error fetching licenses', error);
      }
    };

    fetchProducts();
    fetchLicenses();
  }, []);
  const getProductNameById = (productId) => {
    const product = products.find(p => p._id === productId);
    return product ? product.name : 'Unknown Product';
  };
  const handleEdit = (license) => {
    setProductId(license.product_id);
    setUserId(license.issuedto);
    setLicenseKey(license.licensekey);
    setActivationStatus(license.activationstatus);
    setIsEditing(true);
    setSelectedLicenseId(license._id);
  };

  const handleDelete = async (licenseId) => {
    try {
      await axios.delete(`http://localhost:4000/web-app/api/licenses/${licenseId}`);
      setLicenses(licenses.filter(license => license._id !== licenseId));
    } catch (error) {
      console.error('Error deleting license:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const licenseData = { product_id: productId, issuedto: userId, licensekey: licenseKey, activationstatus: activationStatus };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:4000/web-app/api/licenses/${selectedLicenseId}`, licenseData);
        setIsEditing(false);
      } else {
        await axios.post('http://localhost:4000/web-app/api/licenses', licenseData);
      }

      setProductId('');
      setUserId('');
      setLicenseKey('');
      setActivationStatus(false);
      setSelectedLicenseId(null);

      const response = await axios.get('http://localhost:4000/web-app/api/licenses');
      setLicenses(response.data);
    } catch (error) {
      console.error('Error submitting license:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Edit License' : 'Generate New License'}</h2>

        <div>
          <label htmlFor="productId">Product ID:</label>
          <select
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option value="">--Select a Product--</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="userId">User ID (Optional):</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="licenseKey">License Key:</label>
          <input
            type="text"
            id="licenseKey"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={activationStatus}
              onChange={(e) => setActivationStatus(e.target.checked)}
            />
            Activation Status
          </label>
        </div>

        <button type="submit">{isEditing ? 'Update License' : 'Generate License'}</button>
      </form>

      <h2>Existing Licenses</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>User ID</th>
            <th>License Key</th>
            <th>Activation Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((license) => (
            <tr key={license._id}>
              <td>{getProductNameById(license.product_id)}</td>
              <td>{license.issuedto}</td>
              <td>{license.licensekey}</td>
              <td>{license.activationstatus ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleEdit(license)}>Edit</button>
                <button onClick={() => handleDelete(license._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default GenerateLicenseForm;
