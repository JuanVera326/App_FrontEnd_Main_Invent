import axios from "axios";

const URL = "http://localhost:9090/api";
const KEY = "bWF0aWFzLm1hL25zZnc=";

export const getItemsUsuarios = async() => {

    try {

        const sendRequest = await axios.get(`${URL}/usuarios`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};

export const usuariosPost = async( obj ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/usuarios/${KEY}`,
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

export const usuariosPut = async( obj , id ) => {

    try {
        
        const sendRequest = await axios({
            url : `${URL}/usuarios/${id}/${KEY}`,
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
export const getItemsUsuariosByName = async( names ) => {

    try {

        const sendRequest = await axios.get(`${URL}/usuarios/name/${names}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};


export const getItemsUsuariosById = async( id ) => {

    try {

        const sendRequest = await axios.get(`${URL}/usuarios/id/${id}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};


export const getItemsUsuariosByCargo = async( cargo ) => {

    try {

        const sendRequest = await axios.get(`${URL}/usuarios/cargo/${cargo}`);
        return sendRequest;

    } catch (error) {

        if ( error.response ) {
            return error.response;
        }

    }

};