import axios from "axios";
import configData from "../config/api.json";

const customerBaseUrl = configData.api + "customers";

class HotelApi {
  static getHotels() {
    return axios.get(hotelBaseUrl);
  }

  static createHotel(hotel, userToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    return axios.post(hotelBaseUrl, hotel, config);
  }

  static deleteHotel(hotelId, userToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    return axios.delete(`${hotelBaseUrl}/${hotelId}`, config);
  }

  // Coming soon
  //   static getHotel(hotel) {
  //     return axios.get(hotelBaseUrl)
  //   }
}

export default HotelApi;
