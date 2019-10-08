import React from "react";
import { Card, Button, Radio, Icon, Modal } from "antd";
import { connect } from "react-redux";
import { get, map } from "lodash";
import Header from "../Header";
import Files from "react-butterfiles";
import FormField from "../../components/FormField";
import { addAdressRequest } from "../../redux/action/profile";

const styles = {
  container: {
    margin: 30
  },
  card: {
    width: "100%",
    margin: 40
  },
  adressModal: {
    width: "80%"
  },
  viewAdress: {
    margin: 10
  },
  viewAdressBtn: {
    width: "20%",
    margin: "20px auto",
    justifyContent: "center"
  }
};
const delieveryLocationType = [
  { label: "HOME", value: "Home" },
  { label: "WORK", value: "Work" },
  { label: "OTHER", value: "Other" }
];
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {},
      addAdressModal: false,
      area: "",
      landmark: "",
      address: "",
      locationType: "",
      viewAdressModal: false
    };
  }
  viewAdressHandler = () => {
    this.setState({ viewAdressModal: true });
  };
  viewAdressCloseHandler = () => {
    this.setState({ viewAdressModal: false });
  };
  addAdressHandler = () => {
    this.setState({ addAdressModal: true });
  };
  closeModal = () => {
    this.setState({ addAdressModal: false });
  };
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  onSelectLocationTypeHandler = value => {
    this.setState({ locationType: value });
  };
  saveAdressHandler = () => {
    const { area, address, landmark, locationType } = this.state;

    const payload = {
      area: area,
      address: address,
      landmark: landmark,
      locationType: locationType
    };
    this.props.addAdress(payload);
    this.setState({
      addAdressModal: false,
      area: "",
      address: "",
      landmark: ""
    });
  };
  addAdressModalContent = () => {
    const { area, address, landmark } = this.state;
    return (
      <div style={styles.adressModal}>
        <FormField
          placeholder="Delievery area"
          name="area"
          onChange={this.handleChange}
          value={area}
        />
        <FormField
          name="address"
          placeholder="Complete Address e.g House No.,Street No."
          onChange={this.handleChange}
          value={address}
        />
        <FormField
          name="landmark"
          placeholder="Landmark"
          onChange={this.handleChange}
          value={landmark}
        />
        <FormField
          placeholder="Location Type"
          type="Select"
          option={delieveryLocationType}
          handleChange={this.onSelectLocationTypeHandler}
        />
      </div>
    );
  };
  render() {
    const user = get(this.props, "user", {});
    const { files, addAdressModal, viewAdressModal } = this.state;
    const modalContent = this.addAdressModalContent();
    const delieveryLocation = get(this.props, "delieveryLocation", []);
    let imageUrl =
      "https://cdn4.iconfinder.com/data/icons/social-communication/142/add_photo-512.png";

    return (
      <div style={styles.container}>
        <Header />
        <div className="d-flex">
          <Card style={styles.card}>
            <div className="d-flex">
              <div>
                <Files
                  multiple={true}
                  maxSize="2mb"
                  multipleMaxCount={1}
                  accept={["image/jpeg", "image/jpg", "image/png"]}
                  onSuccess={files => this.setState({ files: files })}
                >
                  {({ browseFiles, getDropZoneProps }) => (
                    <>
                      <div {...getDropZoneProps({ className: "myDropZone" })} />
                      <img
                        src={imageUrl}
                        alt=""
                        width="200"
                        height="150"
                        onClick={browseFiles}
                      />
                    </>
                  )}
                </Files>
              </div>
              <div>
                <h1>{user.full_name}</h1>
                <div>{user.email}</div>
                <div>{user.contact}</div>
              </div>
            </div>
          </Card>
          <Card style={styles.card}>
            <div className="d-flex">
              <h1>SAVED ADDRESSES</h1>
              <Button type="primary" ghost onClick={this.addAdressHandler}>
                Add ADDRESS
              </Button>
            </div>
            {delieveryLocation.length > 0 ? (
              <div>
                <Card>
                  <h3>{delieveryLocation[0].locationType}</h3>
                  <div>{delieveryLocation[0].area}</div>
                  <div>
                    {delieveryLocation[0].address}{" "}
                    {delieveryLocation[0].landmark}
                  </div>
                </Card>
                <div style={styles.viewAdressBtn}>
                  <Button type="link" onClick={this.viewAdressHandler}>
                    Show All Address
                  </Button>
                </div>
              </div>
            ) : (
              <h3>No Address Found! Please add an Address</h3>
            )}
            <Modal
              title="VIEW ALL SAVED ADDRESS"
              visible={viewAdressModal}
              onOk={this.viewAdressCloseHandler}
              onCancel={this.viewAdressCloseHandler}
            >
              {delieveryLocation.length > 0 &&
                map(delieveryLocation, location => (
                  <Card style={styles.viewAdress}>
                    <h3>{location.locationType}</h3>
                    <div>{location.area}</div>
                    <div>
                      {location.address} {location.landmark}
                    </div>
                  </Card>
                ))}
            </Modal>
          </Card>
        </div>
        {addAdressModal && (
          <Modal
            title="ADD A ADRESS"
            visible={addAdressModal}
            onOk={this.saveAdressHandler}
            onCancel={this.closeModal}
          >
            {modalContent}
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  const { delieveryLocation } = state.profile;
  return {
    user: user,
    delieveryLocation: delieveryLocation
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addAdress: payload => dispatch(addAdressRequest(payload))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
