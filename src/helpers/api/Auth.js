import axios from "axios";
const URL = "https://47ff-152-200-157-110.ngrok-free.app/api";  //Production
// const URL = "http://localhost:9090/api"; //LocalHost

export const auth_post = async( obj ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/auth`,
            method : 'POST',
            headers : {
                "Content-Type":"application/json",
                "ngrok-skip-browser-warning" : ""   //Production
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