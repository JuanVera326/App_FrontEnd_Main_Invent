import axios from "axios";

const URL = "http://localhost:9090/api";
const KEY = "bWF0aWFzLm1hL25zZnc=";

export const getItemsModdev = async() => {

    try {

        const sendRequest = await axios.get(`${URL}/moddev`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};

export const getItemsModdevByGeneralName = async( names ) => {

    try {

        const sendRequest = await axios.get(`${URL}/moddev/general/name/${names}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};