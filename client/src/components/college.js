import web3 from "./web3";
import College from "../build/College.json";

const CollegeInstance = new web3.eth.Contract(
  JSON.parse(College.interface),
  "0x4e1afb4b57E21aBe1a31fe4F1E8544c3dEf48619"
);

export default CollegeInstance;
