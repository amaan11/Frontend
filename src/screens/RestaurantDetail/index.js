import React from "react";
import { Button, Carousel, Card, Modal } from "antd";
import { get, map } from "lodash";
import { connect } from "react-redux";
import Header from "../Header";
import FormField from "../../components/FormField";
import { session, guests, date } from "../../utils/data";

const styles = {
  bookTableDiv: {
    width: "30%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30
  },
  bookBtn: {
    width: 120,
    height: 50
  }
};
class RestaurantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBookTableModal: false
    };
  }
  getRestaurantId = () => {
    const restaurantId = get(this.props, "location.pathname", null);

    const splitId = restaurantId.split("/");
    let id = 0;
    if (splitId.length > 0) {
      id = splitId[2] && splitId[2];
    }
    return id;
  };
  filterRestaurant = () => {
    const restaurantId = this.getRestaurantId();
    const restaurants = get(this.props, "restaurants", []);

    let filteredRestaurant = {};
    if (restaurants.length > 0) {
      filteredRestaurant = restaurants.filter(rest => {
        return rest.restaurant.id == restaurantId;
      });
    }
    const result = filteredRestaurant[0].restaurant;

    return result;
  };
  onCarouselChange = () => {};
  bookTableHandler = () => {
    this.setState({ isBookTableModal: true });
  };
  handleOk = e => {
    this.setState({
      isBookTableModal: false
    });
  };

  handleCancel = e => {
    this.setState({
      isBookTableModal: false
    });
  };

  componentDidMount = () => {
    const id = this.getRestaurantId();
    this.filterRestaurant(id);
  };

  render() {
    const restaurant = this.filterRestaurant();
    const { isBookTableModal } = this.state;

    console.log("restaurant1>>s", date);
    return (
      <div>
        <Header />
        <div style={{ width: "50%", margin: "auto" }}>
          <Card>
            <Carousel afterChange={this.onCarouselChange}>
              {map(restaurant.photos, photo => (
                <img
                  src={photo.photo.url}
                  alt=""
                  width="100px"
                  height="250px"
                />
              ))}
            </Carousel>
            <div className="d-flex">
              <div>
                <h1 style={{ fontSize: 40 }}>{restaurant.name}</h1>
                <div>{restaurant.location.address}</div>
              </div>
              <div>
                <div className="bg-green m-10" style={{ fontSize: 20 }}>
                  {restaurant.user_rating.aggregate_rating}/5
                </div>
                <div>{restaurant.user_rating.votes} votes</div>
              </div>
            </div>
            <div style={styles.bookTableDiv}>
              <Button
                type="primary"
                style={styles.bookBtn}
                onClick={this.bookTableHandler}
              >
                BOOK A TABLE
              </Button>
            </div>
          </Card>
        </div>
        {
          <Modal
            title="BOOK A TABLE"
            visible={isBookTableModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width="700px"
          >
            <h3>{restaurant.name}</h3>
            <div className="d-flex">
              <div>
                <div>Pickup A Date</div>
                <FormField
                  type="Select"
                  option={date}
                  placeholder="SELECT A DATE"
                />
              </div>
              <div>
                <div>Number Of Guests</div>
                <FormField
                  type="Select"
                  option={session}
                  placeholder="NO. OF Guests"
                />
              </div>
              <div>
                <div>Select A Session</div>
                <FormField
                  type="Select"
                  option={guests}
                  placeholder="SELECT A SESSION"
                />
              </div>
            </div>
          </Modal>
        }
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { restaurants } = state.dashboard;
  return {
    restaurants: restaurants
  };
};

export default connect(
  mapStateToProps,
  null
)(RestaurantDetail);
