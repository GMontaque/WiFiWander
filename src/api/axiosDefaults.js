import axios from "axios";

axios.defaults.baseURL = "https://wifi-wander-api-835560a3f6c2.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;