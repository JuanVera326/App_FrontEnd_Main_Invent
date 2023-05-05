import axios from "axios";
//const URL = "https://6d13-152-200-157-110.ngrok-free.app/api";  //Production
 const URL = "http://127.0.0.1:9090/api"; //LocalHost

export const auth_post = async( obj ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/auth`,
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