import { Routes, Route, BrowserRouter} from 'react-router-dom';
import React from 'react'
import { Home } from '../components/pages/Home/HomeLogin';
import { Principal } from '../components/pages/Principal/Principal';
import { PDF } from '../components/layouts/Views/PDF/PDF';

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/principal' element={<Principal />}/>
            <Route path='/pdf:data_doc' element={<PDF />}/>
        </Routes>
    </BrowserRouter>
  )
}