import axios from 'axios';

const YOLP_API = axios.create({
    baseURL: "http://yolp-env.eba-trqyyiqz.us-east-1.elasticbeanstalk.com/yolp",
    headers: {
        "Content-Type": "application/json"
    }
})

export default YOLP_API;
