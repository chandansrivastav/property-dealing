import axios from "axios";
import CryptoJs from "crypto-js";
import constant from "./constant";

async function GET(url) {
    try {
        const config = {
            headers: {
                Authorization: generateAuthentication()
            }
        };
        let response = await axios.get(constant.BASE_API_URL + url, config);
        if (response && response.status == 200) {
            return response.data;
        } else {
            return {
                status: "error",
                message: "Server is not responding. please try again.",
                data: {}
            }
        }
    } catch (e) {
        console.log("GET Error:-", e.message)
        return {
            status: "error",
            message: "Something went wrong. please try again.",
            data: {}
        }
    }
}

async function POST(url, data) {
    try {
        const config = {
            headers: {
                Authorization: generateAuthentication()
            }
        };
        let response = await axios.post(constant.BASE_API_URL + url, data, config);
        if (response && response.status == 200) {
            return response.data;
        } else {
            return {
                status: "error",
                message: "Server is not responding. please try again.",
                data: {}
            }
        }
    } catch (e) {
        console.log("POST Error:-", e.message);
        return {
            status: "error",
            message: "Something went wrong. please try again.",
            data: {}
        }
    }
}

function generateAuthentication() {
    const encryptToken = CryptoJs.AES.encrypt(JSON.stringify({
        generateTokenTime: new Date()
    }), constant.FRONT_SECRET_KEY).toString();
    return encryptToken;
}

export {
    GET,
    POST
}