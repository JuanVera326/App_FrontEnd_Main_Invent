import { main_invent_images } from '../../../helpers/ImagesHelp';
import { Button } from '../../ui/Buttons/Button';
import { Input } from '../../ui/Input/Input';
import { auth_post } from '../../../helpers/api/Auth';
import { useEffect, useState } from 'react';
import "./HomeLogin.css";
import "animate.css"
import { ubi_get_general } from '../../../helpers/api/UbiRequest';

export const Home = () => {

  const [user, setuser] = useState(localStorage.setItem( "usuario", JSON.stringify({ rol:0 })));
  const [prev_user, setprev_user] = useState({});
  const [ubicacion, setubicacion] = useState(localStorage.setItem( "ubicacion", JSON.stringify({})));
  const [msj_val, setmsj_val] = useState("");
  const [loader, setloader] = useState(false);
  const [val_state_request, setval_state_request] = useState(0);


  const handleAuth = (e) => {

    setloader(true);
    e.preventDefault();

    let val = {};

         if ( !e.target[0].value.trim() ) { val.errors = "Correo Vacío"; }
    else if ( !/\S+@\S+\.\S+/.test(e.target[0].value)) { val.errors = "Correo Inválido"; }
    else if ( !e.target[1].value.trim() ) { val.errors = "Contraseña Vacía" }

    if ( JSON.stringify(val) === "{}" ) {

      let auth = {
        "email": e.target[0].value,
        "password": e.target[1].value
      };
  
      auth_post( auth ).then(info => {
        
        if (info.status === 202) { 

          setuser(info.data); 
          setprev_user(info.data);
          setval_state_request(info.status); 
          setloader(false);

        }else if (info.status === 403) {

          setmsj_val(info.data);
          setloader(false);
          setval_state_request(info.status); 
          
        }else{ 

          setval_state_request(info.status); 
          setuser({ rol : 0 }); 
          setmsj_val(info.data); 
          setloader(false);

        }
  
      });
    }else{

      setloader(false);
      setmsj_val(val.errors);

    }

    val = {};

  }

  useEffect(() => { setTimeout(() => { setmsj_val(""); }, 3500); }, [msj_val])
  

  useEffect(() => {

    if (val_state_request === 202) { 

      if ( prev_user.rol === 1 || prev_user.rol === 3 ) {
            
        ubi_get_general().then(info => {
  
          if (info.data.lenght === 0) {
  
            let ubi = info.data[0];
            localStorage.setItem( "ubicacion", JSON.stringify(ubi) );
            localStorage.setItem( "usuario", JSON.stringify(user) );
            window.location = "/principal";
  
          }else{ 

            localStorage.setItem( "ubicacion", JSON.stringify({}) ); 
            localStorage.setItem( "usuario", JSON.stringify(user) );
            window.location = "/principal"; 

          }
          
        });
  
      }

    }

  }, [val_state_request])

  return (
    <div className='home'>

      <video id="my-video" className="video" autoPlay muted loop>
        <source src={main_invent_images('./vids/waves.mp4')} type="video/mp4"></source>
      </video>

          <div className="animate__animated animate__fadeInUp principal_view">

              <div className="cont_left_login">

                  <div className="cont_images_login">

                    <h1 id='h1' style={{color:"rgb(37, 228, 11)"}}>Main Invent</h1>

                    <br />

                    <img className='img1' src={main_invent_images("./images/home/pngegg.png")} alt="Main Invent"/>

                  </div>

              </div>

              <div className="cont_form"> 

                  <div className="cont_input_login">

                      <h1 id='h1'>Log In</h1>
                    
                    <div className="box">
                        <form onSubmit={handleAuth}>
                          <div className="input-container">
                          { ( !!loader ) && <h1 class="loader" /> }
                            <Input type={"text"} id="email"/>
                            <label>Email</label>		
                          </div>
                          <div className="input-container">		
                            <Input type={"password"} id="password"/>
                            <label>Password</label>
                          </div>
                          <div className="btn_cont_login">
                            <Button text={"Entrar"} type={"submit"} style={"btn"}/>
                            <img className='img2' src={main_invent_images("./images/home/logoSena.png")} alt="logoSena"/>
                            <p style={{color:"rgb(31 136 173)", fontSize:"13px"}}>{msj_val}</p>
                          </div>
                        </form>	
                      </div> 

                  </div>

              </div>

          </div>
    </div>
  )
}
