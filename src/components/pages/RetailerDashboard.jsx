// import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const RetailerDashboard = () => {
  const [showForm, setShowForm] = useState(false)
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({
    name: '',
    source: '',
    destination: '',
    image: null
  })

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const addProduct = newProduct => {
    setProducts([...products, newProduct])
    console.log(products)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleImage = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }


  const handleAdd = e => {
    e.preventDefault()
    if (
      product.name &&
      product.source &&
      product.destination &&
      product.image
    ) {
      addProduct({
        id: uuidv4(),
        ...product
      })
      setProduct({
        name: '',
        source: '',
        destination: '',
        image: null
      })
    }
    toggleForm()
  }

  return (
    <div>
      <div className='bg-gray-100 min-h-screen relative'>
        <div className='bg-gray-100'>
          <div className='btn ml-md'>
            <button
              onClick={toggleForm}
              className='bg-pink-400 px-12 mb-4 mt-2 ml- text-white py-4 rounded-md hover:bg-pink-500'
            >
              {showForm ? 'Cancel' : 'Add Product'}
            </button>
          </div>
          {showForm && (
            <div className='w-1/2 mx-auto ml-25% bg-gray-100 absolute'>
              <form onSubmit={handleAdd}>
                <div className='mb-5'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium mx-4 text-gray-700'
                  >
                    Product Name
                  </label>
                  <input
                    className='block w-full py-4 px-4 mt-1 border border-gray-300 rounded-lg shadow-sm placeholer-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    type='text'
                    id='name'
                    name='name'
                    required
                    placeholder='Enter Your Product Name'
                    value={product.name}
                    onChange={handleChange}
                  />
                </div>
                <div className='mb-5'>
                  <label
                    htmlFor='source'
                    className='block text-sm font-medium mx-4 text-gray-700'
                  >
                    Source
                  </label>
                  <input
                    className='block w-full py-4 px-4 mt-1 border border-gray-300 rounded-lg shadow-sm placeholer-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    type='text'
                    id='source'
                    name='source'
                    required
                    placeholder='Enter The Source of the Product'
                    onChange={handleChange}
                    value={product.source}
                  />
                </div>
                <div className='mb-5'>
                  <label
                    htmlFor='destination'
                    className='block text-sm font-medium mx-4 text-gray-700'
                  >
                    Destination
                  </label>
                  <input
                    className='block w-full py-4 px-4 mt-1 border border-gray-300 rounded-lg shadow-sm placeholer-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    type='text'
                    id='destination'
                    name='destination'
                    required
                    placeholder='Enter The Destination of the Product'
                    onChange={handleChange}
                    value={product.destination}
                  />
                </div>
                <div className='mb-5'>
                  <input
                    className=' py-4 px-4 mt-1'
                    type='file'
                    id='file'
                    name='file'
                    required
                    accept='image/*'
                    onChange={handleImage}
                  />
                </div>
                <div className='btn'>
                  <button
                    type='submit'
                    className='bg-pink-400 mb-4 text-white w-full py-4 rounded-lg hover:bg-pink-500'
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-10'>
          {products.map(product => {
            return (
              <div
                key={product.id}
                className='mb-4 bg-white w-96 shadow-lg rounded-lg p-4'
              >
                <img
                  className='w-full h-48 object-cover rounded-t-lg'
                  src={product.image}
                  alt={product.name}
                />
                <div className='p-4'>
                  <h3 className='text-lg font-semibold'>{product.name}</h3>
                  <p className='text-gray-600'>{`Source: ${product.source}`}</p>
                  <p className='text-gray-600'>{`Destination: ${product.destination}`}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RetailerDashboard
