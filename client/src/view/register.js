import React from "react";
import { Link } from "react-router-dom";
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
import { registerAction } from "../app/auth/auth.action";
import { connect } from "react-redux";
import { withRouter } from "../utils/routes";
import TokenService from "../api/token.service";

class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }
  componentDidMount() {
    if (TokenService.getUser()?.email) {
      this.props.router.navigate("/profile");
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.registerAction(this.state);
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
          <Title>Create Account</Title>
          <Form>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.changeEvent}
            />
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="someemail@email.com"
              onChange={this.changeEvent}
            />
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={this.changeEvent}
            />
            <Button onClick={this.handleSubmit} disabled={this.props.loading}>
              {this.props.loading ? "Register" : "Register"}
            </Button>
            <Link to="/">
              <Small>Already have an account</Small>
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
    registrationSuccess: state.authPage.registrationSuccess,
  };
};

const mapDispatchToProps = {
  registerAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RegisterComponent));
