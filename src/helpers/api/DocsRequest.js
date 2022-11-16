import axios from "axios";

const URL = "http://localhost:9090/api";
const KEY = "aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==";

export const dos_post = async( doc , names , id ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/files/${names}/${id}/${KEY}`,
            method : 'POST',
            headers : {
                "Content-Type":"multipart/form-data",
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