import React from "react";
import { Input, Select } from "antd";

const { Option } = Select;

export default function FormField(props) {
  switch (props.type) {
    case "Select":
      return (
        <div>
          <Select
            defaultValue={props.defaultValue}
            style={{ width: 200, margin: 10 }}
            onChange={props.handleChange}
            placeholder="placeholder"
          >
            {props.option.length > 0 &&
              props.option.map(option => (
                <Option value={option.value}>{option.label}</Option>
              ))}
          </Select>
        </div>
      );
    default:
      return (
        <div>
          <Input
            placeholder={props.placeholder}
            type={props.type}
            className="input-field"
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            prefix={props.children}
          />
        </div>
      );
  }
}
