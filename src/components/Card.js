import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const styles = {
  card: {
    width: 420,
    margin: 10,
    height: 300
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
  }
};
class CustomCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const imageUrl = `${this.props.imageUrl}`;

    return (
      <div>
        <Card hoverable style={styles.card}>
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
        </Card>
      </div>
    );
  }
}

export default CustomCard;
