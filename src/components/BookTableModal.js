import React, { useState, forwardRef, useEffect } from "react";
import { Modal } from "antd";
import moment from "moment";
import { session, guests, date } from "../utils/data";
import FormField from "./FormField";

const getTimeSlots = () => {
  let timeSlot = [];
  const startTime = moment("11:00:00", "HH:mm A");
  const endTime = moment("21:00:00", "HH:mm A");

  while (startTime.isBefore(endTime)) {
    const time = moment(startTime).format("HH:mm A");
    timeSlot.push({ label: time, value: time });
    startTime.add(30, "minutes");
  }
  return timeSlot;
};
class BookTableModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(),
      selectGuestCount: 0,
      selectedSession: "",
      selectedTime: "",
      fullName: "",
      contact: ""
    };
  }
  onDateHandler = (value, event) => {
    const date =
      moment(value, "DD-MM-YYYY").format("YYYY-MM-DD") + "T00:00:00.000Z";
    this.setState({ selectedDate: date });
  };
  onTimeHandler = (value, e) => {
    this.setState({ selectedTime: moment(value, "HH:mm A").format("HH:mm") });
  };
  onSessionHandler = (value, e) => {
    this.setState({ selectedSession: value });
  };
  onGuestHandler = (value, e) => {
    this.setState({ selectGuestCount: value });
  };
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  bookingData = () => {
    const {
      selectedDate,
      selectGuestCount,
      selectedSession,
      selectedTime,
      fullName,
      contact
    } = this.state;

    const data = {
      fullName: fullName,
      contact: contact,
      bookingDate: selectedDate,
      bookingTime: selectedTime,
      sessionType: selectedSession,
      guestCount: selectGuestCount
    };
    return data;
  };
  render() {
    const {
      isTableBooked,
      restaurantName,
      handleOk,
      handleCancel
    } = this.props;
    const { contact, fullName } = this.state;
    const timeSlots = getTimeSlots();

    return (
      <div>
        <Modal
          title="BOOK A TABLE"
          visible={isTableBooked}
          okText="BOOK"
          onOk={handleOk}
          onCancel={handleCancel}
          width="700px"
        >
          <h1>{restaurantName}</h1>
          <h3>ENTER BOOKING DETAILS</h3>
          <div className="d-flex">
            <div>
              <div className="padding">Pickup A Date</div>
              <FormField
                type="Select"
                option={date}
                placeholder="SELECT A DATE"
                handleChange={this.onDateHandler}
                name="date"
              />
            </div>
            <div>
              <div className="padding">Number Of Guests</div>
              <FormField
                type="Select"
                option={guests}
                placeholder="NO. OF Guests"
                handleChange={this.onGuestHandler}
              />
            </div>
          </div>
          <div className="d-flex">
            <div>
              <div className="padding">Select A Session</div>
              <FormField
                type="Select"
                option={session}
                placeholder="SELECT A SESSION"
                handleChange={this.onSessionHandler}
              />
            </div>
            <div>
              <div className="padding">Select A TIME SLOT</div>
              <FormField
                type="Select"
                option={timeSlots}
                placeholder="SELECT A TIME SLOT"
                handleChange={this.onTimeHandler}
              />
            </div>
          </div>
          <h3>ENTER GUEST DETAILS</h3>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: 60 }}>
              <div className="padding">FULL NAME</div>
              <FormField
                placeholder="FULL NAME"
                name="fullName"
                onChange={this.onInputChange}
                value={fullName}
              />
            </div>
            <div>
              <div className="padding">Contact Number</div>
              <FormField
                placeholder="Contact Number"
                onChange={this.onInputChange}
                name="contact"
                value={contact}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default BookTableModal;
