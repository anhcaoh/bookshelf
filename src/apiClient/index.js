import axios from "axios";
import fetchBooks from "./fetchBooks";
const apiClient = axios.create();
apiClient.interceptors.request.use(config => config, async error => Promise.reject(error));
apiClient.interceptors.response.use(response => response?.data, async error => Promise.reject(error));
const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy, fetchBooks };
export default apiClient;