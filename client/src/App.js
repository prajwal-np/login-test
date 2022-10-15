import './App.css';
import  LoginComponent from './view/login';
import RegisterComponent from './view/register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './view/profile';
import React from 'react';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
       <Routes>
        <Route exact path='/' element={<LoginComponent/>} />
        <Route exact path='/register' element={<RegisterComponent/>} />
        <Route exact path='/profile' element={<Profile/>} />
       </Routes>
       </BrowserRouter>
    );
  }
  
}

export default App;
