import axios from "axios";

const URL = "http://10.205.194.24:9090/api";
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

export const getItemsOtrosByGeneralId = async( ids ) => {

    try {

        const sendRequest = await axios.get(`${URL}/otros/general/id/${ids}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};


export const getItemsOtrosByType = async( types ) => {

    try {

        const sendRequest = await axios.get(`${URL}/otros/type/${types}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }
};