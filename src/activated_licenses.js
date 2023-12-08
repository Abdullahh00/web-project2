import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ActivatedLicenses.css'; 
import Usernavbar from './user_navbar';

function ActivatedLicenses() {
    const [licenses, setLicenses] = useState([]);
    const [products, setProducts] = useState({});

    useEffect(() => {
        async function fetchLicenses() {
            try {
                const response = await axios.get('http://localhost:4000/web-app/api/licenses');
                const activated = response.data.filter(license => 
                    license.activationstatus === true && license.issuedto !== ''
                );
                setLicenses(activated);

                const productIds = activated.map(license => license.product_id).filter((value, index, self) => self.indexOf(value) === index);
                const productResponses = await Promise.all(productIds.map(id => axios.get(`http://localhost:4000/web-app/api/products/${id}`)));
                const productData = productResponses.reduce((acc, current) => {
                    acc[current.data._id] = current.data;
                    return acc;
                }, {});
                setProducts(productData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchLicenses();
    }, []);

    return (
        <>  
        <Usernavbar/> 
             <div className="activated-licenses">
            <h2>Activated Licenses</h2>
            <div className="license-list">
                {licenses.map(license => (
                    <div key={license._id} className="license-item">
                        <p><strong>License Key:</strong> {license.licensekey}</p>
                        <p><strong>Issued To:</strong> {license.issuedto}</p>
                        <p><strong>Activation Status:</strong> {license.activationstatus.toString()}</p>
                        <p><strong>Product:</strong> {products[license.product_id]?.name || 'Loading...'}</p>
                        <p><strong>Product:</strong> {products[license.product_id]?.version || 'Loading...'}</p>
                        <p><strong>Product:</strong> {products[license.product_id]?.description || 'Loading...'}</p>
                    </div>
                ))}
            </div>
        </div>
        </>

    );
}

export default ActivatedLicenses;
