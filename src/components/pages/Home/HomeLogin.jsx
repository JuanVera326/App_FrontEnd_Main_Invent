import { main_invent_images } from '../../../helpers/ImagesHelp';
import { Button } from '../../ui/Buttons/Button';
import { Input } from '../../ui/Input/Input';
import { auth_post } from '../../../helpers/api/Auth';
import { useEffect, useState } from 'react';
import "./HomeLogin.css";
import "animate.css"

export const Home = () => {

  const [user, setuser] = useState({});
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
          setval_state_request(info.status); 
        }else{ 
          setval_state_request(info.status); 
          setuser({}); setmsj_val(info.data); 
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

      localStorage.setItem( "usuario", JSON.stringify(user) ); 
      window.location = "/principal"; 
      setloader(false);

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

                    <h1 id='h1' style={{color:"rgb(255 198 28)"}}>Main Invent</h1>

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
