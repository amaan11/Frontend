export default class Auth {
  static authenticate = async payload => {
    console.log("authenticate>fgh>>", payload);
    const _url = "http://localhost:8000/login";

    let response = {};
    await fetch(_url, {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(res => (response = res));
    return response;
  };

  static register = async payload => {
    const _url = "http://localhost:8000/register";

    await fetch(_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  };
  static getRestaurantByCity = async payload => {
    console.log("auth>>>", payload);
    const user_key = "0d26c3391b2e55b8d83c4ec767927059";
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
        "user-key": user_key
      }
    })
      .then(response => response.json())
      .then(res => (response = res));

    return response;
  };
}
