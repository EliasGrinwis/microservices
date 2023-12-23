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
}

export default RoomApi;
