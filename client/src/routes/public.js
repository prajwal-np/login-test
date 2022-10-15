
import  LoginComponent from '../view/login';
import RegisterComponent from '../view/register';
import { Route, Routes } from 'react-router-dom';
import React from 'react';

class PublicRoute extends React.Component {
  render(){
    return (
       <Routes>
        <Route exact path='/' element={<LoginComponent/>} />
        <Route path='*' element={<LoginComponent/>} />
        <Route exact path='/register' element={<RegisterComponent/>} />
       </Routes>
    );
  }
  
}

export default PublicRoute;
