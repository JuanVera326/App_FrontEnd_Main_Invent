import axios from "axios";

const URL = "http://10.205.194.24:9090//api";
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

export const getItemsModdevByGeneralId = async( ids ) => {

    try {

        const sendRequest = await axios.get(`${URL}/moddev/general/id/${ids}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};


export const getItemsModdevByType = async( types ) => {

    try {

        const sendRequest = await axios.get(`${URL}/moddev/type/${types}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }
};