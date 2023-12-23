import axios from "axios";
import configData from "../config/api.json";
import RoomApi from "./room_api";

const hotelBaseUrl = configData.api + "hotels";

class HotelApi {
  static async getHotels() {
    try {
      const response = await axios.get(hotelBaseUrl);

      if (!Array.isArray(response.data)) {
        throw new Error(
          "Unexpected data structure: Response data is not an array."
        );
      }

      const hotelsData = [];

      for (let data of response.data) {
        if (!data.roomIds || !Array.isArray(data.roomIds)) {
          console.error(
            "Unexpected data structure: Missing or invalid roomIds."
          );
          continue; // Skip this iteration and proceed with the next one
        }

        const hotelDetails = {
          id: data.id, // Adjust based on the actual property in your data
          name: data.name, // Adjust based on the actual property in your data
          description: data.description, // Adjust based on the actual property in your data
          city: data.city, // Adjust based on the actual property in your data
          address: data.address, // Adjust based on the actual property in your data
          image: data.image, // Adjust based on the actual property in your data
          rooms: {}, // Initialize an empty object for rooms
        };

        const roomPromises = data.roomIds.map(async (roomId, index) => {
          try {
            const roomResponse = await RoomApi.getRoom(roomId);
            // Adjust based on your actual data
            hotelDetails.rooms[`room${index + 1}`] = {
              id: roomResponse.data.id,
              pricePerDay: roomResponse.data.pricePerDay,
              amountOfBeds: roomResponse.data.amountOfBeds,
              roomSize: roomResponse.data.roomSize,
              isKitchen: roomResponse.data.kitchen,
              isTelevision: roomResponse.data.television,
            };
          } catch (error) {
            console.error(`Error fetching room with id ${roomId}:`, error);
          }
        });

        await Promise.all(roomPromises);

        // Add the hotel details to the hotelsData array
        hotelsData.push(hotelDetails);
      }

      return hotelsData;
    } catch (error) {
      console.error("Error fetching hotels:", error);
      throw error;
    }
  }
  static getHotel(hotelId) {
    return axios.get(`${hotelBaseUrl}/${hotelId}`);
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

  static updateHotel(hotel, userToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };

    const url = `${hotelBaseUrl}/${hotel.id}`;

    return axios.put(hotel, url, config);
  }

  static deleteHotel(hotelId, userToken) {
    console.log(hotelId);
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
