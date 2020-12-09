const web3 = require("./web3");
const College = require("./build/College.json");

const instance = new web3.eth.Contract(
  JSON.parse(College.interface),
  "0x2517E4CC4A4B00Fffec7F5BC2c2E66F1b3591A59"
);

module.exports = instance;
