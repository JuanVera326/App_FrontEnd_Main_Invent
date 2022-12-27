import axios from "axios";

const URL = "http://10.205.194.24:9090/api";
const KEY = "bWF0aWFzLm1hL25zZnc=";

export const getItemsElectronicos = async() => {

    try {

        const sendRequest = await axios.get(`${URL}/electronicos`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};

export const getItemsElectronicosByGeneralName = async( names ) => {

    try {

        const sendRequest = await axios.get(`${URL}/electronicos/general/name/${names}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};
export const getItemsElectronicosByGeneralId = async( ids ) => {

    try {

        const sendRequest = await axios.get(`${URL}/electronicos/general/id/${ids}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};


export const getItemsElectronicosByType = async( types ) => {

    try {

        const sendRequest = await axios.get(`${URL}/electronicos/type/${types}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }
};