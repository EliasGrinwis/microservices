import axios from "axios";
import configData from "../config/api.json";

const roomBaseUrl = configData.api + "rooms";

class RoomApi {
  static getRooms() {
    return axios.get(roomBaseUrl);
  }

  static getRoom(roomId) {
    return axios.get(`${roomBaseUrl}/${roomId}`);
  }

  static createRoom(room, userToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    return axios.post(roomBaseUrl, room, config);
  }
}

export default RoomApi;
