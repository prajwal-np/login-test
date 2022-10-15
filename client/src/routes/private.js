import { Route, Routes } from 'react-router-dom';
import Profile from '../view/profile';
import React from 'react';

class PrivateRoute extends React.Component {
  render(){
    return (
       <Routes>
        <Route exact path='/' element={<Profile/>} />
        <Route path='*' element={<Profile/>} />
       </Routes>
    );
  }
  
}

export default PrivateRoute;
