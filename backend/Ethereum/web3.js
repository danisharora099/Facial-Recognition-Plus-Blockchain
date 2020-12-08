const Web3 = require('web3')

let web3;

  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/496bb591c87a469bbce14872177c3b4f'
  );
  web3 = new Web3(provider);


module.exports = web3;