// import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import QrCode from '../common/QrCode'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SmartContractService from '../../contracts/smartContract'
import Navbar from '../common/Navbar'
const ManufacturerDashboard = () => {
  const [showForm, setShowForm] = useState(false)
  const [products, setProducts] = useState([])
  const [qrValue, setqrValue] = useState('')
  const [product, setProduct] = useState({
    productId: '',
    productName: '',
    quantity: '',
    url: '',
    qrCode: '',
    image: null
  })

  const handleGenerateQr = () => {
    setqrValue(product.productId)
  }

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

  const handleAdd = async () => {
    console.log('handleAdd function is called')

    try {
      const result = await SmartContractService.manufactureProduct()
      toast.success('Product Added successfully')
      console.log(result)
    } catch (error) {
      console.error(error.message)
      toast.error('Error')
    }
    toggleForm()
  }

  return (
    <div>
      {/* <Navbar /> */}
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
                    htmlFor='productId'
                    className='block text-sm font-medium mx-4 text-gray-700'
                  >
                    Product ID
                  </label>
                  <input
                    className='block w-full py-4 px-4 mt-1 border border-gray-300 rounded-lg shadow-sm placeholer-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    type='productId'
                    id='productId'
                    name='productId'
                    required
                    placeholder='Enter Your Product ID'
                    value={product.productId}
                    onChange={handleChange}
                  />
                </div>

                <div className='mb-5'>
                  <label
                    htmlFor='productName'
                    className='block text-sm font-medium mx-4 text-gray-700'
                  >
                    Product Name
                  </label>
                  <input
                    className='block w-full py-4 px-4 mt-1 border border-gray-300 rounded-lg shadow-sm placeholer-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    type='text'
                    id='productName'
                    name='productName'
                    required
                    placeholder='Enter Your Product Name'
                    value={product.productName}
                    onChange={handleChange}
                  />
                </div>

                <div className='mb-5'>
                  <label
                    htmlFor='source'
                    className='block text-sm font-medium mx-4 text-gray-700'
                  >
                    Quantity
                  </label>
                  <input
                    className='block w-full py-4 px-4 mt-1 border border-gray-300 rounded-lg shadow-sm placeholer-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    type='number'
                    id='quantity'
                    name='quantity'
                    required
                    placeholder='Enter The Quantity of the Product'
                    onChange={handleChange}
                    value={product.quantity}
                  />
                </div>
                <div className='mb-5'>
                  <label
                    htmlFor='url'
                    className='block text-sm font-medium mx-4 text-gray-700'
                  >
                    URL
                  </label>
                  <input
                    className='block w-full py-4 px-4 mt-1 border border-gray-300 rounded-lg shadow-sm placeholer-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    type='text'
                    id='url'
                    name='url'
                    required
                    placeholder='Enter The URL of the Product'
                    onChange={handleChange}
                    value={product.url}
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

                <div className=''>
                  <button
                    className='bg-pink-400 p-4 rounded-lg mb-4 ml-500'
                    type='button'
                    onClick={handleGenerateQr}
                  >
                    Generate QRCode
                  </button>
                  {qrValue && <QrCode value={qrValue} />}
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
                  <h3 className='text-lg font-semibold'>{`ID: ${product.ID}`}</h3>
                  <h3 className='text-lg font-semibold'>{product.name}</h3>
                  <p className='text-gray-600'>{`Quantity: ${product.quantity}`}</p>
                  <p className='text-gray-600'>{`URL: ${product.url}`}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </div>
  )
}

export default ManufacturerDashboard
