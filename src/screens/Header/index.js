import React from "react";
import { Drawer, Button, Icon } from "antd";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placement: "left"
    };
  }
  showDrawer = () => {
    this.setState({
      visible: true
    });
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
    return (
      <div>
        <div className="d-flex m-10">
          <div>
            <Icon type="unordered-list" onClick={this.showDrawer} />
          </div>
          <div>
            <Button type="danger">Logout</Button>
          </div>
        </div>
        <Drawer
          placement={placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>ORDER FOOD</p>
          <p>BOOK TABLE</p>
          <p>PROFILE</p>
          <p>REVIEWS</p>
        </Drawer>
      </div>
    );
  }
}

export default Header;
