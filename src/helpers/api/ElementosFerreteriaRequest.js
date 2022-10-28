import axios from "axios";

const URL = "http://localhost:9090/api";
const KEY = "bWF0aWFzLm1hL25zZnc=";

export const getItemsEleferre = async() => {

    try {

        const sendRequest = await axios.get(`${URL}/eleferre`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};

export const getItemsEleferreByGeneralName = async( names ) => {

    try {

        const sendRequest = await axios.get(`${URL}/eleferre/general/name/${names}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};