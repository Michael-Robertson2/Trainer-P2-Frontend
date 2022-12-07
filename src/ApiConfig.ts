import axios from 'axios';

const YOLP_API = axios.create({
    baseURL: "http://localhost:8080/yolp",
    headers: {
        "Content-Type": "application/json"
    }
})

export default YOLP_API;
