import React from "react";
import { Modal, Button } from "antd";

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.isVisible ? props.isVisible : false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { isVisible } = this.state;
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={isVisible}
          footer={[
            <div>
              <Button key="back" onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button key="submit" type="primary" onClick={this.handleOk}>
                Submit
              </Button>
            </div>
          ]}
        >
          {this.props.content}
        </Modal>
      </div>
    );
  }
}

export default CustomModal;
