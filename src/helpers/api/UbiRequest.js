import axios from "axios";

const URL = "https://6d13-152-200-157-110.ngrok-free.app/api";  //Production
// const URL = "http://localhost:9090/api"; //LocalHost
const KEY = "bWF0aWFzLm1hL25zZnc=";

export const ubi_put = async( obj , id ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/ubi/${id}/${KEY}`,
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

export const ubi_post = async( obj ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/ubi/${KEY}`,
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
export const ubi_del = async( id ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/ubi/${id}/${KEY}`,
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

export const ubi_get = async( id ) => {

    try {

        const sendRequest = await axios.get(`${URL}/ubi/${id}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};

export const ubi_get_general = async() => {

    try {

        const sendRequest = await axios.get(`${URL}/ubi`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};