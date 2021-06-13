const config = require("dotenv").config();
const Web3 = require("web3");
const Tx = require("@ethereumjs/tx").Transaction;
const contractAbi = require("./contractAbi.json");

const ganacheUrl = config.parsed.GANACHE_URL;
const contractAddress =contractAddress;
const privateKey = config.parsed.ACCOUNT_PRIVATE_KEY;
const accountAddress = config.parsed.ACCOUNT_ADDRESS;

const web3 = new Web3(ganacheUrl);

const SimpleStorageContract = new web3.eth.Contract(contractAbi,contractAddress);
const accountPrivateKey = Buffer.from(privateKey, 'hex');
const data = SimpleStorageContract.methods.setData(1995).encodeABI();

web3.eth.getTransactionCount(accountAddress)
  .then(nonce => {
    const tx = new Tx({
      nonce: nonce,
      gasPrice: '0x20000000000',
      gasLimit: '0x27511',
      to: contractAddress,
      value: 0,
      data: data
    });
    const signedTx = tx.sign(accountPrivateKey);

    const serializedTx = signedTx.serialize();

    web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
      .on('receipt', console.log);
  }); 