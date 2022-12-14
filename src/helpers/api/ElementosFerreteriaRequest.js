import axios from "axios";

const URL = "http://10.205.194.24:9090//api";
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
export const getItemsEleferreByGeneralId = async( ids ) => {

    try {

        const sendRequest = await axios.get(`${URL}/eleferre/general/id/${ids}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};


export const getItemsEleferreByType = async( types ) => {

    try {

        const sendRequest = await axios.get(`${URL}/eleferre/type/${types}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }
};