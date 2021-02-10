import web3 from "./web3";
import College from "../build/college.json";

const CollegeInstance = new web3.eth.Contract(
  JSON.parse(College.interface),
  "0xfAeE820Cefd4c80E9F91438f28E5e9e162076B6E"
);

export default CollegeInstance;
