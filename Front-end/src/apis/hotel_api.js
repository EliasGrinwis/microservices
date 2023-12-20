import axios from "axios";
import configData from "../config/api.json";

const hotelBaseUrl = configData.api + "hotels";

class HotelApi {
  static getHotels() {
    return axios.get(hotelBaseUrl);
  }

  // Coming soon
  //   static getHotel(hotel) {
  //     return axios.get(hotelBaseUrl)
  //   }
}

export default HotelApi;
