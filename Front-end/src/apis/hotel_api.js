import axios from "axios";
import configData from "../config/api.json";

const hotelBaseUrl = configData.api + "hotels";

class HotelApi {
  static async getHotels() {
    return axios
      .get(hotelBaseUrl)
      .then((response) => {
        for (let data of response.data) {
          console.log(data.roomIds);
        }
        return response;
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
        throw error; // Rethrow the error to propagate it
      });
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
