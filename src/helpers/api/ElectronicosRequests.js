import axios from "axios";

const URL = "http://localhost:9090/api";
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

export const getTypesItemsElectronicos = async() => {

    try {

        const sendRequest = await axios.get(`${URL}/electronicos/tipos`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};

export const electronicos_put = async( obj , id , doc ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/electronicos/${id}/${KEY}/${doc}`,
            method : 'PUT',
            headers : {
                "Content-Type":"application/json",
            },
            data : obj
            
        }).catch( function( error ) {

            if ( error.response ) {
                return error.response;
            }

        });
                
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};
export const electronicos_post = async( obj ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/electronicos/${KEY}`,
            method : 'POST',
            headers : {
                "Content-Type":"application/json",
            },
            data : obj
            
        }).catch( function( error ) {

            if ( error.response ) {
                return error.response;
            }

        });
                
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};

export const electronicos_del = async( id ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/electronicos/delete/${id}/${KEY}`,
            method : 'DELETE'

        }).catch( function( error ) {

            if ( error.response ) {
                return error.response;
            }

        });
                
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};