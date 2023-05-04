import axios from "axios";

const URL = "https://83d6-152-200-157-110.ngrok-free.app/api";  //Production
// const URL = "http://localhost:9090/api"; //LocalHost
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


export const getTypesItemsOtros= async() => {

    try {

        const sendRequest = await axios.get(`${URL}/otros/tipos`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};

export const otros_put = async( obj , id , doc ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/otros/${id}/${KEY}/${doc}`,
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
export const otros_post = async( obj ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/otros/${KEY}`,
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

export const otros_del = async( id ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/otros/delete/${id}/${KEY}`,
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