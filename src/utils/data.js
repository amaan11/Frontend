import moment from "moment";
const cities = [
  { label: "New Delhi", value: "1" },
  { label: "Kolkatta", value: "2" },
  { label: "Mumbai", value: "3" },
  { label: "Bangalore", value: "4" },
  { label: "Pune", value: "5" },
  { label: "Hyderabad", value: "6" },
  { label: "Chennai", value: "7" },
  { label: "Lucknow", value: "8" },
  { label: "Kochi", value: "9" },
  { label: "Jaipur", value: "10" }
];

const date = [];
const guests = [];
for (let i = 1; i < 20; i++) {
  date.push({
    label: moment()
      .add(i, "days")
      .format("ddd,DD-MM-YYYY"),
    value: moment()
      .add(i, "days")
      .format("DD-MM-YYYY")
  });
}

const session = [
  { label: "LUNCH", value: "lunch" },
  { label: "BREAKFAST", value: "breakfast" },
  { label: "DINNER", value: "dinner" }
];
for (let i = 1; i < 10; i++) {
  guests.push({ label: i, value: i });
}

export { cities, date, session, guests };
