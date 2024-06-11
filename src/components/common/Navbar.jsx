// import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <nav
        className='bg-pink-200
 flex justify-between align-middle '
      >
        <h1 className='font-bold text-lg flex align-middle pl-3 pt-3'>
          <Link to='/'>
            <button>SMARCE</button>
          </Link>
        </h1>
        <div>
          <ul className='flex gap-5 align-middle pt-1 pr-1'>
            <li>
              <Link to='/logInAs'>
                <Button text='SignIn' />
              </Link>
            </li>
            <li>
              <Link to='/signUpAs'>
                <Button text='SignUp' />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
