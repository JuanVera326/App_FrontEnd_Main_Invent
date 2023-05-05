import axios from "axios";

const URL = "https://47ff-152-200-157-110.ngrok-free.app/api";  //Production
// const URL = "http://localhost:9090/api"; //LocalHost                           
const KEY = "bWF0aWFzLm1hL25zZnc=";

export const getItemsElectricos = async() => {

    try {

        const sendRequest = await axios.get(`${URL}/electricos`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};


export const getItemsElectricosByGeneralName = async( names ) => {

    try {

        const sendRequest = await axios.get(`${URL}/electricos/general/name/${names}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};


export const getItemsElectricosByGeneralId = async( ids ) => {

    try {

        const sendRequest = await axios.get(`${URL}/electricos/general/id/${ids}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};

export const getItemsElectricosByType = async( types ) => {

    try {

        const sendRequest = await axios.get(`${URL}/electricos/type/${types}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

}

export const getTypesItemsElectricos = async() => {

    try {

        const sendRequest = await axios.get(`${URL}/electricos/tipos`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};

export const electricos_put = async( obj , id , doc) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/electricos/${id}/${KEY}/${doc}`,
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
export const electricos_post = async( obj ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/electricos/${KEY}`,
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

export const electricos_del = async( id ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/electricos/delete/${id}/${KEY}`,
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