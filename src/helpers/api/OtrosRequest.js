import axios from "axios";

const URL = "http://localhost:9090/api";
const KEY = "bWF0aWFzLm1hL25zZnc=";

export const getItemsOtros = async() => {

    try {

        const sendRequest = await axios.get(`${URL}/otros`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};

export const getItemsOtrosByGeneralName = async( names ) => {

    try {

        const sendRequest = await axios.get(`${URL}/otros/general/name/${names}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};