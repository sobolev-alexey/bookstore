import axios from 'axios';
import { notification } from 'antd';

const serverAPI = process.env.REACT_APP_BACKEND_URL;

const callApi = async (mode, url, payload) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    };

    let response;
    switch (mode) {
      case "post":
        response = await axios.post(`${serverAPI}/${url}`, payload, { headers });
        break;
      case "put":
        response = await axios.put(`${serverAPI}/${url}`, payload, { headers });
        break;
      case "get":
      default:
        response = await axios.get(`${serverAPI}/${url}`, { headers });
    }

    return response?.data;
  } catch (error) {
    console.error(error);
    errorCallback(error?.response?.data?.error || null);
    return error?.response?.data?.error || null
  }
};

const errorCallback = (customError = null) => {
  notification['error']({
    key: 'api-error',
    duration: 10,
    message: 'Error',
    description: customError || 'There was an error loading your data. Please see console output for details.'
  });
}

export default callApi;