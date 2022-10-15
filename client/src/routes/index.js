import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import PublicRoute from './public';
import PrivateRoute from './private';
import { logIn } from '../app/auth/auth.slice';

class RouteLayout extends React.Component {
    componentDidMount() {
          this.props.logIn()
      }
  render(){
    return (
      <BrowserRouter>
       {this.props.loggedIn?<PrivateRoute/>:<PublicRoute/>}
       </BrowserRouter>
    );
  }
  
}
const mapStateToProps = (state) => {
    return {
      loggedIn: state.authPage.loggedIn,
    };
  };
  
  const mapDispatchToProps = {
    logIn
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RouteLayout);
  
