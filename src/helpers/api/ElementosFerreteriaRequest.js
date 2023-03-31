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


export const getTypesItemsEleferre= async() => {

    try {

        const sendRequest = await axios.get(`${URL}/eleferre/tipos`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};

export const eleferre_put = async( obj , id , doc ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/eleferre/${id}/${KEY}/${doc}`,
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
export const eleferre_post = async( obj ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/eleferre/${KEY}`,
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

export const eleferre_del = async( id ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/eleferre/delete/${id}/${KEY}`,
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