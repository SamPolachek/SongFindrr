import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://api.soundcharts.com/api/v2";

const soundcharts = axios.create({
    baseURL: BASE_URL,
    headers: {
        "x-app-id": process.env.SOUNDCHARTS_APP_ID,
        "x-app-token": process.env.SOUNDCHARTS_APP_TOKEN,
    },
});

export default soundcharts;