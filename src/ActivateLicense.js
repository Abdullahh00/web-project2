import React, { useState } from 'react';
import axios from 'axios';
import Usernavbar from './user_navbar';

function ActivateLicense() {
    const [licenseKey, setLicenseKey] = useState('');
    const [message, setMessage] = useState('');

    const activateLicense = async () => {
        try {
            const response = await axios.post('http://localhost:4000/web-app/api/licenses/activate1', { licenseKey });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data.message || 'Error activating license');
        }
    };

    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            margin: '20px',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px'
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd'
        },
        button: {
            padding: '10px 15px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer'
        },
        message: {
            marginTop: '10px'
        }
    };

    return (
        <>
        <Usernavbar/>
        <div style={styles.container}>
            <h2>Activate License</h2>
            <input 
                type="text" 
                value={licenseKey} 
                onChange={(e) => setLicenseKey(e.target.value)} 
                placeholder="Enter License Key"
                style={styles.input}
            />
            <button onClick={activateLicense} style={styles.button}>Activate</button>
            {message && <p style={styles.message}>{message}</p>}
        </div>
        </>
    );
}

export default ActivateLicense;
