import web3 from './web3';

const address = '0x3Ea18f9c8DA3F8D6dd1089B5D9ac0224085623a2';
const abi = [{
  "constant": false,
  "inputs": [{
    "name": "price",
    "type": "uint256"
  }],
  "name": "createTicket",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "getDeployedTickets",
  "outputs": [{
    "name": "",
    "type": "address[]"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "",
    "type": "uint256"
  }],
  "name": "deployedTickets",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}];

var web3export;
if (typeof web3 !== 'undefined') {
  web3export = new web3.eth.Contract(abi, address);
} else {
  console.log('No web3? You should consider trying MetaMask!');
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  web3export = undefined;
}

export default web3export;
