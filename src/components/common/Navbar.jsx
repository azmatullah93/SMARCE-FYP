// import React, { useState, useEffect } from 'react';
// import Button from './Button';
// import { Link } from 'react-router-dom';
// import SmartContractService from '../../contracts/smartContract';

// const Navbar = () => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [account, setAccount] = useState(null);

//   const ConnectWallet = async () => {
//     console.log("ConnectWallet in Navbar called");
//     try {
//       await SmartContractService.connectWallet();
//       const signer = await SmartContractService.signer;
//       const address = await signer.getAddress();
//       setAccount(address);
//       setIsConnected(true);
//       console.log('Wallet connected successfully');
//     } catch (error) {
//       console.error('Error connecting wallet:', error);
//     }
//   };

//   const handleSignUp = async () => {
//     console.log("SignUp button clicked");
//     try {
//       if (!isConnected) {
//         // Connect wallet first if not already connected
//         await ConnectWallet();
//       }
//       const result = await SmartContractService.signUP();
//       console.log('SignUp result:', result);
//     } catch (error) {
//       console.error('Error signing up:', error);
//     }
//   };

//   return (
//     <div>
//       <nav className='bg-pink-200 flex justify-between align-middle'>
//         <h1 className='font-bold text-lg flex align-middle pl-3 pt-3'>
//           <Link to='/'>
//             <button>SMARCE</button>
//           </Link>
//         </h1>
//         <div>
//           <ul className='flex gap-5 align-middle pt-1 pr-1'>
//             <li>
//               <Button text={isConnected ? 'Connected' : 'Connect Wallet'} onClick={ConnectWallet} />
//             </li>
//             <li>
//               <Button text='SignUp' onClick={handleSignUp} />
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;













import React, { useState } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import SmartContractService from '../../contracts/smartContract';

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [ownerID, setOwnerID] = useState(null);

  const ConnectWallet = async () => {
    console.log("ConnectWallet in Navbar called");
    try {
      await SmartContractService.connectWallet();
      const signer = await SmartContractService.signer;
      const address = await signer.getAddress();
      setAccount(address);
      setIsConnected(true);
      console.log('Wallet connected successfully');

      // Fetch the owner ID
      const fetchedOwnerID = await SmartContractService.getOwnerID(address);
      setOwnerID(fetchedOwnerID); // Directly set the ownerID
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleSignUp = async () => {
    console.log("SignUp button clicked");
    try {
      if (!isConnected) {
        // Connect wallet first if not already connected
        await ConnectWallet();
      }
      const result = await SmartContractService.signUP();
      console.log('SignUp result:', result);
      setOwnerID(result.toNumber ? result.toNumber() : parseInt(result, 10)); // Convert if necessary
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <nav className='bg-pink-200 flex justify-between align-middle'>
        <h1 className='font-bold text-lg flex align-middle pl-3 pt-3'>
          <Link to='/'>
            <button>SMARCE</button>
          </Link>
        </h1>
        <div>
          <ul className='flex gap-5 align-middle pt-1 pr-1'>
            <li>
              <Button text={isConnected ? 'Connected' : 'Connect Wallet'} onClick={ConnectWallet} />
            </li>
            <li>
              <Button
                text={ownerID > 0 ? `Owner ID: ${ownerID}` : 'SignUp'}
                onClick={ownerID > 0 ? null : handleSignUp} // Disable signup if already registered
              />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;





















// // import React from 'react'
// import Button from './Button'
// import { Link } from 'react-router-dom'
// import Web3 from 'web3'

// const connectWallet = async () => {
//   if (window.ethereum) {
//     try {
//       await window.ethereum.request({ method: 'eth_requestAccounts' })
//       console.log('MetaMask connected')
//       // You can now use Web3.js to interact with Ethereum
//       const web3 = new Web3(window.ethereum)
//       // Example: get accounts
//       const accounts = await web3.eth.getAccounts()
//       console.log('Accounts:', accounts)
//     } catch (error) {
//       console.error('Error connecting MetaMask:', error)
//     }
//   } else {
//     console.error('MetaMask not found')
//   }
// }

// const Navbar = () => {
//   return (
//     <div>
//       <nav
//         className='bg-pink-200
//  flex justify-between align-middle '
//       >
//         <h1 className='font-bold text-lg flex align-middle pl-3 pt-3'>
//           <Link to='/'>
//             <button>SMARCE</button>
//           </Link>
//         </h1>
//         <div>
//           <ul className='flex gap-5 align-middle pt-1 pr-1'>
//             <li>
//               <Link to='/logInAs'>
//                 <Button text='SignIn' />
//               </Link>
//             </li>
//             <li>
//               <Link to='/signUpAs'>
//                 <Button text='SignUp' oncClick={connectWallet} />
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   )
// }

// export default Navbar
