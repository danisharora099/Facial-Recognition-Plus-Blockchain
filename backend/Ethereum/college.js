const web3 = require("./web3");
const College = require("./build/College.json");

const instance = new web3.eth.Contract(
  JSON.parse(College.interface),
  '0xfAeE820Cefd4c80E9F91438f28E5e9e162076B6E'
);

module.exports = instance;
