import { Routes, Route, BrowserRouter} from 'react-router-dom';
import React from 'react'
import { Home } from '../components/pages/Home/HomeLogin';
import { Principal } from '../components/pages/Principal/Principal';

export const AppRouter = () => {
  //const font = "";  //To Develop
  const font = "/Main-Invent";  //To Production

  return (
    <BrowserRouter>
        <Routes>
            <Route path={font} element={<Home />}/>
            <Route path={font + "/principal"} element={<Principal />}/>
        </Routes>
    </BrowserRouter>
  )
}