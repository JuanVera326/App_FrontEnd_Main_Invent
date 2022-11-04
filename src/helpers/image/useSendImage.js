import { useState } from "react";

export const useSendImage = () => {

    const [urlImage, seturlImage] = useState("");
  
    let myWidgetUser = window.cloudinary.createUploadWidget(
        {
            cloudName: "dnkn5kpmx",
            uploadPreset: "usuarios"
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
            console.log("Imagen subida con exito!!");
            seturlImage(result.info.url);
          }
        }
    );

    let myWidgetElectrics = window.cloudinary.createUploadWidget(
        {
          cloudName: "dnkn5kpmx",
          uploadPreset: "electricos"
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Imagen subida con exito!!");
            seturlImage(result.info.url);
          }
        }
    );


    let myWidgetElectronicos = window.cloudinary.createUploadWidget(
        {
          cloudName: "dnkn5kpmx",
          uploadPreset: "electronicos"
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Imagen subida con exito!!");
            seturlImage(result.info.url);
          }
        }
    );

    let myWidgetModdev = window.cloudinary.createUploadWidget(
      {
        cloudName: "dnkn5kpmx",
        uploadPreset: "moddev"
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Imagen subida con exito!!");
          seturlImage(result.info.url);
        }
      }
    );

    let myWidgetEleferre = window.cloudinary.createUploadWidget(
        {
        cloudName: "dnkn5kpmx",
        uploadPreset: "eleferre"
        },
        (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Imagen subida con exito!!");
            seturlImage(result.info.url);
        }
        }
    );

    let myWidgetOtros = window.cloudinary.createUploadWidget(
        {
        cloudName: "dnkn5kpmx",
        uploadPreset: "otrositems"
        },
        (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Imagen subida con exito!!");
            seturlImage(result.info.url);
        }
        }
    );

    return {
        myWidgetElectrics,
        myWidgetUser,
        myWidgetElectronicos,
        myWidgetEleferre,
        myWidgetModdev,
        myWidgetOtros,
        urlImage
      };
};