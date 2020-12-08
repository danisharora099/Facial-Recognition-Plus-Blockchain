const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const College = require('./build/College.json');

const provider = new HDWalletProvider(
  'liquid hurdle rose element clump afraid glare achieve clap guitar enjoy vocal',
  'https://rinkeby.infura.io/v3/496bb591c87a469bbce14872177c3b4f'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(College.interface)
  )
    .deploy({ data: College.bytecode })
    .send({ gas: '5000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();