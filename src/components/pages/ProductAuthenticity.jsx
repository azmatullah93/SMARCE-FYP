// import React from 'react'

import { useState } from 'react'
const ProductAuthenticity = () => {
  const [formData, setFormData] = useState({
    productid: ''
  })

  const handleChange = (e)=> {
    
  }
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
      </div>
    </div>
  )
}

export default ProductAuthenticity
