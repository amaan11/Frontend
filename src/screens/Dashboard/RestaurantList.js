import React from "react";
import { get, map } from "lodash";
import Card from "../../components/Card";

const styles = {
  noResult: {
    textAlign: "center"
  }
};
class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getRestaurantList = () => {
    const restaurants = get(this.props, "restaurants", []);

    console.log("restaurants", restaurants);
    let restaurantList = [];
    restaurantList =
      restaurants.length > 0 &&
      map(restaurants, restaurant => {
        return restaurant.restaurant;
      });
    return restaurantList;
  };
  render() {
    const restaurantList = this.getRestaurantList();
    console.log("resr>>>", restaurantList);
    // const imageUrl=require("")
    return (
      <div className="d-flex" style={{ flexWrap: "wrap" }}>
        {restaurantList.length > 0 ? (
          map(restaurantList, restaurant => (
            <Card
              title={restaurant.name}
              cost={restaurant.average_cost_for_two}
              cuisines={restaurant.cuisines}
              description={restaurant.location.address}
              imageUrl={restaurant.featured_image}
              highlights={restaurant.highlights}
              timing={restaurant.timings}
              rating={restaurant.user_rating.aggregate_rating}
              votes={restaurant.user_rating.votes}
            />
          ))
        ) : (
          <h1 style={styles.noResult}>Sorry,No Results Found</h1>
        )}
      </div>
    );
  }
}

export default RestaurantList;
