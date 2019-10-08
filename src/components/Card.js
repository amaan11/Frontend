import React from "react";
import { Card, Button } from "antd";
import { get } from "lodash";
import BookTableModal from "./BookTableModal";
import history from "../history";

const { Meta } = Card;

const styles = {
  card: {
    width: 420,
    margin: 15,
    height: 320
  },
  image: {
    marginRight: 20
  },
  innerDiv: {
    display: "flex",
    marginTop: 5
  },
  content: {
    margin: "2px 0 0 15px"
  },
  bookBtn: {
    margin: "10px 0 10px 0"
  }
};
class CustomCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBookTableModal: false
    };
    this.child = React.createRef();
  }
  handleOkHandler = e => {
    const restaurantId = get(this.props, "restaurantId", null);
    const child = get(this.child, "current", null);

    if (child && restaurantId) {
      const data = child.bookingData();
      const payload = {
        ...data,
        restaurantId: restaurantId
      };
      this.props.bookTable(payload);
    }
    this.setState({
      isBookTableModal: false
    });
  };

  handleCancelHandler = event => {
    this.setState({
      isBookTableModal: false
    });
  };
  bookTableHandler = event => {
    this.setState({ isBookTableModal: true });
  };
  navigateHandler = () => {
    const restaurantId = get(this.props, "restaurantId", null);

    if (restaurantId) {
      history.push(`/restaurant/${restaurantId}`);
    }
  };

  render() {
    const imageUrl = `${this.props.imageUrl}`;
    const { isBookTableModal } = this.state;

    return (
      <div>
        <Card hoverable style={styles.card}>
          <div onClick={this.navigateHandler}>
            <div className="d-flex">
              <img
                src={imageUrl}
                width="100px"
                height="100px"
                style={styles.image}
              />
              <Meta
                title={this.props.title}
                description={this.props.description}
                style={{ marginRight: 10 }}
              />
              <div>
                {this.props.rating >= 4.0 ? (
                  <div className="bg-green">{this.props.rating}</div>
                ) : this.props.rating >= 3.0 && this.props.rating <= 4.0 ? (
                  <div className="bg-yellow">{this.props.rating}</div>
                ) : (
                  <div className="bg-red">{this.props.rating}</div>
                )}
                <div>{this.props.votes} Votes</div>
              </div>
            </div>
            <div style={styles.innerDiv}>
              <h3>Cost For Two</h3>
              <div style={styles.content}>{this.props.cost}</div>
            </div>
            <div style={styles.innerDiv}>
              <h3>Cuisines</h3>
              <div style={styles.content}>{this.props.cuisines}</div>
            </div>
            <div style={styles.innerDiv}>
              <h3>Timings</h3>
              <div style={styles.content}>{this.props.timing}</div>
            </div>
          </div>
          <Button
            type="primary"
            style={styles.bookBtn}
            onClick={this.bookTableHandler}
          >
            BOOK A TABLE
          </Button>
          {isBookTableModal && (
            <BookTableModal
              visible={isBookTableModal}
              restaurantName={this.props.title}
              isTableBooked={isBookTableModal}
              handleCancel={this.handleCancelHandler}
              handleOk={this.handleOkHandler}
              ref={this.child}
            />
          )}
        </Card>
      </div>
    );
  }
}

export default CustomCard;
