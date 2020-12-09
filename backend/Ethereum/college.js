const web3 = require('./web3');
const College = require('./build/College.json');

const instance = new web3.eth.Contract(
  JSON.parse(College.interface),
  '0x4e1afb4b57E21aBe1a31fe4F1E8544c3dEf48619'
);

module.exports = instance;
