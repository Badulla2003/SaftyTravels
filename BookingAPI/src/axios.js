import axios from 'axios';
const axiosRequest = axios.create({
    baseURL: 'http://localhost:8090', // Replace this with your API's base URL
    headers: {
      'Authorization': 'Bearer your_token_here', // Add your default authorization header if needed
      'Content-Type': 'application/json', // Set the default content type for requests
    },
  });
export default axiosRequest;