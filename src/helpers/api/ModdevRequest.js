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



export const getTypesItemsModdev= async() => {

    try {

        const sendRequest = await axios.get(`${URL}/moddev/tipos`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};

export const moddev_put = async( obj , id ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/moddev/${id}/${KEY}`,
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
export const moddev_post = async( obj ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/moddev/${KEY}`,
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

export const moddev_del = async( id ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/moddev/delete/${id}/${KEY}`,
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