import React from "react";
import { Card } from "antd";
import Header from "../Header";
import Files from "react-butterfiles";

const styles = {
  container: {
    width: "70%",
    margin: "auto"
  }
};
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {}
    };
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Header />
        <div style={styles.container}>
          <Card style={{ width: "100%" }}>
            <div style={{ display: "flex", width: "50%", margin: "auto" }}>
              <Files
                multiple={true}
                maxSize="2mb"
                multipleMaxSize="10mb"
                multipleMaxCount={3}
                accept={["image/jpeg", "image/jpg"]}
                onSuccess={files => this.setState({ files })}
              >
                {({ browseFiles, getDropZoneProps }) => (
                  <>
                    <div {...getDropZoneProps({ className: "myDropZone" })} />
                    <img
                      src="https://cdn4.iconfinder.com/data/icons/social-communication/142/add_photo-512.png"
                      alt=""
                      width="200"
                      height="150"
                      onClick={browseFiles}
                    />
                  </>
                )}
              </Files>

              <h1 style={{ margin: 30 }}>Amaan Salheen</h1>
            </div>
          </Card>
          <h2>Favourite restaurants</h2>
          <Card style={{ width: 300 }}>
            <div>21 #rd cross road,Bangalore</div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Profile;
