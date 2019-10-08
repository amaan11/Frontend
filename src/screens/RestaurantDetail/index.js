import React from "react";
import { Button, Carousel, Card, Modal } from "antd";
import { get, map } from "lodash";
import { connect } from "react-redux";
import Header from "../Header";
import BookTableModal from "../../components/BookTableModal";
import { bookTableRequest } from "../../redux/action/dashboard";
import swal from "sweetalert";
import moment from "moment";

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
    this.child = React.createRef();
  }
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
  checkAvailability = (restaurantId, date, time, guestCount) => {
    const tableBookings = get(this.props, "tableBookings", []);
    let count = 0;
    if (tableBookings && tableBookings.length > 0) {
      map(tableBookings, booking => {
        if (
          booking.restaurant_id == restaurantId &&
          booking.booking_date == date &&
          booking.booking_time == time
        ) {
          count += parseInt(booking.no_of_guests);
        }
      });
    }
    if (count + guestCount <= 20) {
      return true;
    } else {
      return false;
    }
  };
  handleOkHandler = async e => {
    const restaurant = this.filterRestaurant();
    const child = get(this.child, "current", null);
    const restaurantId = restaurant.id;
    if (child) {
      const data = child.bookingData();
      const payload = {
        ...data,
        restaurantId: restaurantId
      };
      const date = moment(data.bookingDate).format("YYYY-MM-DD");
      const time = data.bookingTime;
      const guestCount = data.guestCount;
      if (this.checkAvailability(restaurantId, date, time, guestCount)) {
        await this.props.bookTable(payload);
        swal("Thank You!", "Your Booking Has been confirmed!", "success");
      } else {
        swal(
          "Booking Not Possible",
          "Plese Select A different Time Slot!",
          "info"
        );
      }
    }
    this.setState({
      isBookTableModal: false
    });
  };

  handleCancelHandler = e => {
    this.setState({
      isBookTableModal: false
    });
  };
  getRestaurantId = () => {
    const restaurantId = get(this.props, "location.pathname", null);

    const splitId = restaurantId.split("/");
    let id = 0;
    if (splitId.length > 0) {
      id = splitId[2] && splitId[2];
    }
    return id;
  };

  onCarouselChange = () => {};
  bookTableHandler = () => {
    this.setState({ isBookTableModal: true });
  };

  componentDidMount = () => {
    const id = this.getRestaurantId();
    this.filterRestaurant(id);
  };

  render() {
    const restaurant = this.filterRestaurant();

    const { isBookTableModal } = this.state;
    console.log("restaurant", restaurant);

    const tableBooking = restaurant.has_table_booking ? false : true;

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
                <div className="bg-green m-10">
                  {restaurant.user_rating.aggregate_rating}
                </div>
                <div>{restaurant.user_rating.votes} votes</div>
              </div>
            </div>
            <div style={styles.bookTableDiv}>
              <Button
                type="primary"
                style={styles.bookBtn}
                onClick={this.bookTableHandler}
                // disabled={tableBooking}
              >
                BOOK A TABLE
              </Button>
            </div>
          </Card>
        </div>
        {isBookTableModal && (
          <BookTableModal
            restaurantName={restaurant.name}
            isTableBooked={isBookTableModal}
            handleCancel={this.handleCancelHandler}
            handleOk={this.handleOkHandler}
            ref={this.child}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { restaurants, tableBookings } = state.dashboard;
  return {
    restaurants: restaurants,
    tableBookings: tableBookings
  };
};
const mapDipatchToProps = dispatch => {
  return {
    bookTable: payload => dispatch(bookTableRequest(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(RestaurantDetail);
