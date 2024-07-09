// import React, { useState } from 'react';
//import QrReader from 'react-qr-reader';
import { useState } from 'react';

const ProductAuthenticity = () => {
  const [formData, setFormData] = useState({
    productID: ''
  });

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');

  const handleScan = data => {
    if (data) {
      setScanResult(data);
      setIsScanning(false);
    }
  };

  const handleError = err => {
    console.error(err);
  };

  const handleSubmit = () => {
    setIsScanning(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <div className=''>
      <div className='flex flex-col items-center bg-gray-100 min-h-screen justify-center'>
        <div>
          <h1 className='text-5xl font-spaceGrotesk font-bold mb-20'>
            Product Authenticity
          </h1>
          <div>
            <label
              className='block text-sm font-medium mx-4 text-gray-700'
              htmlFor='productID'
            >
              Product ID
            </label>
            <input
              onChange={handleChange}
              value={formData.productID}
              type='text'
              name='productID'
              id='productID'
              autoComplete='id'
              required
              placeholder='Enter Product ID'
              className='block w-full py-4 px-4 mt-1 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
        </div>
        <button
          className='bg-pink-400 p-4 rounded-lg mb-4 mt-4 text-white'
          type='button'
          onClick={handleSubmit}
        >
          Scan QRCode
        </button>
        {isScanning && (
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        )}
        {scanResult && (
          <div className='mt-4 p-4 bg-green-200 rounded'>
            <p>Scanned Result: {scanResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAuthenticity;
