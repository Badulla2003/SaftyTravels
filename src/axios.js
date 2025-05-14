import axios from 'axios';
const axiosRequest = axios.create({
    // baseURL: 'http://localhost:8080', // Replace this with your API's base URL
    baseURL:'https://saftytravelscode-production.up.railway.app/',
    headers: {
      'Authorization': 'Bearer your_token_here', // Add your default authorization header if needed
      'Content-Type': 'application/json', // Set the default content type for requests
    },
  });
export default axiosRequest;