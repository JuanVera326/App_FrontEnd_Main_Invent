import axios from "axios";

const URL = "http://10.205.194.24:9090//api";
const KEY = "bWF0aWFzLm1hL25zZnc=";

export const doc_post = async( doc , names , id ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/files/${id}/${names}/${KEY}`,
            method : 'POST',
            headers : {
                "Content-Type":"multipart/form-data",
            },
            data : doc
            
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

export const doc_del = async( id ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/files/${id}/${KEY}`,
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