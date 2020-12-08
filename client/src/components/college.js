import web3 from './web3';
import College from '../build/college.json';

const CollegeInstance = new web3.eth.Contract(
  JSON.parse(College.interface),
  '0x5B164B9b2e689908ca4DcB5de703f9F7aB95855e'
);

export default CollegeInstance;
