export default class Auth {
  static authenticate = payload => {
    // const response = await authenticate(payload)
    // if (response.success) {
    //     return Promise.resolve(response)
    // }
    // else {
    //     return Promise.reject(response)
    // }
  };
  static getRestaurantByCity = async payload => {
    console.log("auth>>>", payload);
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

    console.log("_url>>>", _url);
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
