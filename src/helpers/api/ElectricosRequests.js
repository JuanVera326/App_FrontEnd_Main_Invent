import axios from "axios";

const URL = "http://localhost:9090/api";
const KEY = "aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==";

export const getItemsElectricos = async() => {

    try {

        const sendRequest = await axios.get(`${URL}/electricos`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};