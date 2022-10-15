import React from "react";
import { connect } from "react-redux";
import { loginAction } from "../app/auth/auth.action";
import { Wrapper, Card, Title, ErrorBox, Button } from "../theme";
import { clear, logout } from "../app/auth/auth.slice";
import TokenService from "../api/token.service";
import { withRouter } from "../utils/routes";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
      },
    };
  }
  componentDidMount() {
    this.setState({
      user: TokenService.getUser(),
    });
 
  }
  logout = () => {
    TokenService.removeUser();
    this.props.logout();
  };
  render() {
    return (
      <Wrapper>
        {this.props.errorMsg ? (
          <ErrorBox> {this.props.errorMsg}</ErrorBox>
        ) : (
          <></>
        )}
        <Card>
          <Title>Welcome</Title>
          <p>{this.state.user.name}</p>
          <small>{this.state.user.email}</small>
          <Button onClick={this.logout}>Logout</Button>
        </Card>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authPage.loading,
    errorMsg: state.authPage.errorMsg,
    registeredEmail: state.authPage.registeredEmail,
  };
};

const mapDispatchToProps = {
  loginAction,
  clear,
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginComponent));
