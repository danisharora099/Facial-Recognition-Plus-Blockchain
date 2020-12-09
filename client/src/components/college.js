import web3 from "./web3";
import College from "../build/college.json";

const CollegeInstance = new web3.eth.Contract(
  JSON.parse(College.interface),
  "0x2517E4CC4A4B00Fffec7F5BC2c2E66F1b3591A59"
);

export default CollegeInstance;
