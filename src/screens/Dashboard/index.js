import React from "react";
import { Drawer, Button, Radio, Icon, Checkbox } from "antd";
import { connect } from "react-redux";
import { get, map, debounce } from "lodash";
import FormField from "../../components/FormField";
import { cities } from "../../utils/data";
import { getRestaurantByCityRequest } from "../../redux/action/dashboard";
import RestaurantList from "./RestaurantList";

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
      placement: "left",
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
        <div className="d-flex m-10">
          <div>
            <Icon type="unordered-list" onClick={this.showDrawer} />
          </div>
          <div>
            <Button type="danger">Logout</Button>
          </div>
        </div>
        <Drawer
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>ORDER FOOD</p>
          <p>BOOK TABLE</p>
          <p>PROFILE</p>
          <p>REVIEWS</p>
        </Drawer>
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
