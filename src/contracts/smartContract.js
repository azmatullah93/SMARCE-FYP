// import { ethers } from 'ethers';
// import contractABI from './SupplyChain.json'; // Update this path

// // Update these with your contract's details
// const contractAddress = '0x5B71964D6b2e1f7f9CDAC032c44d6AFDB705fc0c';

// class SmartContractService {
//   constructor() {
//     try {
//       this.provider = new ethers.providers.Web3Provider(window.ethereum);
//       this.signer = this.provider.getSigner();
//       this.contract = new ethers.Contract(contractAddress, contractABI, this.signer);
//     } catch (error) {
//       console.error('Error initializing SmartContractService:', error);
//     }
//   }

//   async connectWallet() {
//     try {
//       await this.provider.send('eth_requestAccounts', []);
//     } catch (error) {
//       console.error('Error connecting wallet:', error);
//     }
//   }

//   async getBalance(address) {
//     try {
//       const balance = await this.provider.getBalance(address);
//       return ethers.utils.formatEther(balance);
//     } catch (error) {
//       console.error('Error fetching balance:', error);
//       return 'N/A'; // Handle gracefully
//     }
//   }

//   async callYourFunction() {
//     try {
//       // Example function call
//       const result = await this.contract.yourContractFunction();
//       return result;
//     } catch (error) {
//       console.error('Error calling contract function:', error);
//       return 'Error'; // Handle gracefully
//     }
//   }

//   async signingUP() {
//     try {
//       // Example function call
//       const result = await this.contract.signUP();
//       return result;
//     } catch (error) {
//       console.error('Error calling signUP function:', error);
//       return 'Error'; // Handle gracefully
//     }
//   }
// }

// export default new SmartContractService();








// import { ethers } from 'ethers';
// import contractABI from './SupplyChain.json'; 

// const abi = contractABI.abi;
// const contractAddress = '0x5B71964D6b2e1f7f9CDAC032c44d6AFDB705fc0c';


// const nodeUrl = 'https://rpc.testnet.fantom.network'; 

// class SmartContractService {
//   constructor() {
//     this.nodeProvider = new ethers.JsonRpcProvider(nodeUrl);
//     this.nodeContract = new ethers.Contract(contractAddress, abi, this.nodeProvider);
//   }

//   async metamask() {
//     if (!window.ethereum) {
//       throw new Error("No Ethereum provider found");
//     }
//     this.provider = new ethers.BrowserProvider(window.ethereum);
//     this.signer = await this.provider.getSigner();
//     this.contract = new ethers.Contract(contractAddress, abi, this.signer);
//     console.log("Provider initialized", this.provider);
//   }

//   async connectWallet() {
//     await this.metamask();
//     await this.provider.send("eth_requestAccounts", []);
//   }

//   async signUP() {
//     await this.metamask();
//     const result = await this.contract.signUP();
//     return result;
//   }

//   async manufactureProduct(productId, qrCode, imageUrl, quantity) {
//     await this.metamask();
//     const tx = await this.contract.manufactureProduct(productId, qrCode, imageUrl, quantity);
//     await tx.wait();
//     return tx;
//   }

//   async transferProduct(productId, toOwnerID, quantity, location) {
//     await this.metamask();
//     const tx = await this.contract.transferProduct(productId, toOwnerID, quantity, location);
//     await tx.wait();
//     return tx;
//   }

//   async sellProduct(productId, customer, quantity) {
//     await this.metamask();
//     const tx = await this.contract.sellProduct(productId, customer, quantity);
//     await tx.wait();
//     return tx;
//   }

//   async checkProduct(qrCode, ownerID) {
//     const product = await this.nodeContract.checkProduct(qrCode, ownerID);
//     return product;
//   }

//   async getProductOwnerID(qrCode) {
//     const ownerID = await this.nodeContract.qrCodes(qrCode);
//     return ownerID;
//   }
  
//   async getProductImage(productId){
//     const image = await this.nodeContract.productImage(productId);
//   }
// }

// export default new SmartContractService();



import { ethers } from 'ethers';
import contractABI from './SupplyChain.json'; // Update this path

const abi = contractABI.abi;
const contractAddress = '0x5B71964D6b2e1f7f9CDAC032c44d6AFDB705fc0c';

const nodeUrl = 'https://rpc.testnet.fantom.network'; 

class SmartContractService {
  constructor() {
    this.nodeProvider = new ethers.JsonRpcProvider(nodeUrl);
    this.nodeContract = new ethers.Contract(contractAddress, abi, this.nodeProvider);
  }

  async metamask() {
    if (!window.ethereum) {
      throw new Error("No Ethereum provider found");
    }
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();
    this.contract = new ethers.Contract(contractAddress, abi, this.signer);
    console.log("Provider initialized", this.provider);
  }

  async connectWallet() {
    await this.metamask();
    await this.provider.send("eth_requestAccounts", []);
  }

  async signUP() {
    await this.metamask();
    const result = await this.contract.signUP();
    return result;
  }

  async manufactureProduct(productId, qrCode, imageUrl, quantity) {
    await this.metamask();
    const tx = await this.contract.manufactureProduct(productId, qrCode, imageUrl, quantity);
    await tx.wait();
    return tx;
  }

  async transferProduct(productId, toOwnerID, quantity, location) {
    await this.metamask();
    const tx = await this.contract.transferProduct(productId, toOwnerID, quantity, location);
    await tx.wait();
    return tx;
  }

  async sellProduct(productId, customer, quantity) {
    await this.metamask();
    const tx = await this.contract.sellProduct(productId, customer, quantity);
    await tx.wait();
    return tx;
  }

  async checkProduct(qrCode, ownerID) {
    const product = await this.nodeContract.checkProduct(qrCode, ownerID);
    return product;
  }

  async getProductOwnerID(qrCode) {
    const ownerID = await this.nodeContract.qrCodes(qrCode);
    return ownerID;
  }
  
  async getProductImage(productId){
    const image = await this.nodeContract.productImage(productId);
    return image;
  }

  async getOwnerID(address) {
    const ownerID = await this.nodeContract.ownerID(address);
    return ownerID.toNumber ? ownerID.toNumber() : parseInt(ownerID, 10); // Convert if necessary
  }
}

export default new SmartContractService();