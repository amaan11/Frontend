import React, { Component } from "react";
import { Button, Icon, Form } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FormField from "../../components/FormField";
import { loginRequest } from "../../redux/action/auth";

const styles = {
  login: {
    paddingLeft: 40
  },
  mainDiv: {
    width: "50%",
    margin: "30px 20px 10px 80px"
  },
  signInBtn: {
    margin: "15px 0 0 80px"
  },
  forgetBtn: {
    margin: "15px 0 0 45px",
    fontSize: 20
  }
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isForgetPassword: false
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onForgetPasswordHandler = this.onForgetPasswordHandler.bind(this);
  }

  onForgetPasswordHandler = () => {
    this.setState({ isForgetPassword: true });
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values;
        const payload = {
          email: email,
          password: password
        };
        this.props.loginRequest(payload);
      }
    });
  };

  render() {
    const { isForgetPassword } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="margin-auto border">
        <div style={styles.mainDiv}>
          <h3 style={styles.login}>ACCOUNT LOGIN </h3>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    }
                  ]
                })(
                  <FormField
                    name="email"
                    type="email"
                    className="input-field"
                    placeholder="email"
                    onChange={this.onChangeHandler}
                  >
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  </FormField>
                )}
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <FormField
                    name="password"
                    type="password"
                    className="input-field"
                    placeholder="password"
                    onChange={this.onChangeHandler}
                  >
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  </FormField>
                )}
              </Form.Item>
            </div>
            <Button
              type="danger"
              size="large"
              style={styles.signInBtn}
              onClick={this.handleSubmit}
            >
              Sign In
            </Button>
          </Form>

          <div style={styles.forgetBtn}>
            <Button type="link" size="large">
              <Link to="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
const WrappedLoginForm = Form.create({ name: "login" })(Login);

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    loginRequest: payload => dispatch(loginRequest(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLoginForm);
