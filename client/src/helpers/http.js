import axios from 'axios';
import determineAPIHost from '../environment/determineAPIHost';

const host = determineAPIHost();

export async function post(endpoint, data) {
  return await axios.post(host + endpoint, data);
}