const web3 = require('./web3');
const College = require('./build/College.json');

const instance = new web3.eth.Contract(
  JSON.parse(College.interface),
  '0x5B164B9b2e689908ca4DcB5de703f9F7aB95855e'
);

module.exports = instance;
