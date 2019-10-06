export default class Auth {
  static authenticate = async payload => {
    const _url = "http://localhost:8000/login";

    let response = {};
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    };
    await fetch(_url, requestOptions)
      .then(response => response.json())
      .then(res => (response = res));
    return response;
  };

  static register = async payload => {
    const _url = "http://localhost:8000/register";
    let response = {};

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    };
    await fetch(_url, requestOptions)
      .then(response => response.json())
      .then(res => (response = res));
    return response;
  };

  static getRestaurantByCity = async payload => {
    let response = {};
    let _url = `https://developers.zomato.com/api/v2.1/search?entity_id=${payload.cityId}&entity_type=city&count=100`;
    if (payload.hasOwnProperty("sort") && payload.hasOwnProperty("order")) {
      _url = `https://developers.zomato.com/api/v2.1/search?entity_id=${payload.cityId}&entity_type=city&count=30&sort=${payload.sort}&order=${payload.order}`;
    }
    if (payload.hasOwnProperty("search")) {
      if (payload.hasOwnProperty("sort") && payload.hasOwnProperty("order")) {
        _url = `https://developers.zomato.com/api/v2.1/search?entity_id=${payload.cityId}&entity_type=city&q=${payload.search}&count=30&sort=${payload.sort}&order=${payload.order}`;
      } else {
        _url = `https://developers.zomato.com/api/v2.1/search?entity_id=${payload.cityId}&entity_type=city&q=${payload.search}&count=30`;
      }
    }

    await fetch(_url, {
      headers: {
        "Content-Type": "application/json",
        "user-key": "0d26c3391b2e55b8d83c4ec767927059"
      }
    })
      .then(response => response.json())
      .then(res => (response = res));
    return response;
  };
}
