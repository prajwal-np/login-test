import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginAction } from "../app/auth/auth.action";
import {
  Form,
  Wrapper,
  Input,
  Button,
  Label,
  Card,
  Title,
  Small,
  ErrorBox,
} from "../theme";
import { clear } from "../app/auth/auth.slice";
import { withRouter } from "../utils/routes";
import TokenService from "../api/token.service";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    if (this.props.registeredEmail) {
      this.setState({
        email: this.props.registeredEmail,
      });
      this.props.clear();
    }
    if (this.props.loggedIn || TokenService.getUser()?.email) {
      this.props.router.navigate("/profile");
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.loggedIn || TokenService.getUser()?.email) {
      this.props.router.navigate("/profile");
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginAction(this.state);
  };
  changeEvent = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
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
          <Title>Login</Title>
          <Form>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.changeEvent}
              placeholder="someemail@email.com"
            />
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.changeEvent}
              placeholder="Enter your password"
            />
            <Button onClick={this.handleSubmit} disabled={this.props.loading}>
              {this.props.loading ? "Loading..." : "Login"}
            </Button>
            <Link to={"/register"}>
              <Small>No account?</Small>
            </Link>
          </Form>
        </Card>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authPage.loading,
    errorMsg: state.authPage.errorMsg,
    loggedIn: state.authPage.loggedIn,
    registeredEmail: state.authPage.registeredEmail,
  };
};

const mapDispatchToProps = {
  loginAction,
  clear,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginComponent));
