import React from "react";
import { Drawer, Button, Icon } from "antd";
import { connect } from "react-redux";
import { get } from "lodash";
import history from "../../history";
import { logoutRequest } from "../../redux/action/auth";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placement: "left"
    };
  }
  routeHandler = value => {
    history.push(`/${value}`);
  };
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };
  logoutHandler = async () => {
    this.props.logoutRequest();
    await history.push("/");
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value
    });
  };
  render() {
    const { placement } = this.state;
    const username = get(this.props, "user.full_name", null);
    return (
      <div>
        <div className="d-flex m-10">
          <div>
            <Icon type="unordered-list" onClick={this.showDrawer} />
          </div>
          <div>
            <Button type="danger" onClick={this.logoutHandler}>
              Logout
            </Button>
          </div>
        </div>
        <Drawer
          placement={placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <h3>Welcome {username}</h3>
          <p
            onClick={() => {
              this.routeHandler("dashboard");
            }}
          >
            BOOK TABLE
          </p>
          <p
            onClick={() => {
              this.routeHandler("profile");
            }}
          >
            PROFILE
          </p>
          <p>REVIEWS</p>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user: user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logoutRequest: () => dispatch(logoutRequest())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
