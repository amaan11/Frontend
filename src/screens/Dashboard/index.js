import React from "react";
import { Button, Radio } from "antd";
import { connect } from "react-redux";
import { get, map, debounce } from "lodash";
import FormField from "../../components/FormField";
import { cities } from "../../utils/data";
import { getRestaurantByCityRequest } from "../../redux/action/dashboard";
import RestaurantList from "./RestaurantList";
import Header from "../Header";

const RadioGroup = Radio.Group;

const styles = {
  innerDiv: {
    width: "70%",
    margin: 30
  },
  selectStyle: {
    margin: 10
  },
  inputStyle: {
    width: "60%"
  },
  sortDiv: {
    margin: 20
  },
  sortLabel: {
    textAlign: "center"
  }
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      cityId: 4,
      searchValue: ""
    };
    this.sortHandler = this.sortHandler.bind(this);
  }
  sortHandler = (sort, order) => {
    const { searchValue, cityId } = this.state;
    const payload = {};

    console.log("state>>>", this.state);
    if (searchValue) {
      payload["search"] = searchValue;
    }
    const sortPayload = {
      ...payload,
      cityId: cityId,
      limit: 100,
      sort: sort,
      order: order
    };
    console.log("sort>>>", sortPayload);

    this.props.getRestaurant(sortPayload);
  };

  selectCityHandler = value => {
    const payload = {
      cityId: value,
      maxLimit: 100
    };
    this.props.getRestaurant(payload);
    this.setState({ cityId: value });
  };
  onSearchHandler = e => {
    const { cityId } = this.state;
    const payload = {
      search: e.target.value,
      cityId: cityId,
      maxLimit: 100
    };
    this.props.getRestaurant(payload);
    this.setState({ searchValue: e.target.value });
  };

  componentDidMount = () => {
    const payload = {
      cityId: 4,
      maxLimit: 100
    };
    this.props.getRestaurant(payload);
  };
  render() {
    const { restaurants } = this.props;
    const { searchValue } = this.state;
    return (
      <div>
        <Header />
        <div style={styles.innerDiv}>
          <div className="d-flex">
            <div style={styles.selectStyle}>
              <FormField
                type="Select"
                defaultValue="Bangalore"
                option={cities}
                handleChange={this.selectCityHandler}
              />
            </div>
            <div style={styles.inputStyle}>
              <FormField
                placeholder="Search restaurant,cuisine"
                onChange={this.onSearchHandler}
                value={searchValue}
              />
            </div>
          </div>
          <div className="d-flex" style={styles.sortDiv}>
            <h3>SORT BY:</h3>
            <div>
              <div style={styles.sortLabel}>Price</div>
              <Button
                type="link"
                block
                onClick={() => this.sortHandler("cost", "asc")}
              >
                Low To High
              </Button>
              <Button
                type="link"
                block
                onClick={() => this.sortHandler("cost", "desc")}
              >
                High To Low
              </Button>
            </div>
            <div>
              <div style={styles.sortLabel}>Rating</div>
              <Button
                type="link"
                block
                onClick={() => this.sortHandler("rating", "asc")}
              >
                Low To High
              </Button>
              <Button
                type="link"
                block
                onClick={() => this.sortHandler("rating", "desc")}
              >
                High To Low
              </Button>
            </div>
          </div>
        </div>

        <div style={{ margin: 30 }}>
          <RestaurantList restaurants={restaurants} />
        </div>
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

const mapDispatchToProps = dispatch => {
  return {
    getRestaurant: payload => dispatch(getRestaurantByCityRequest(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
