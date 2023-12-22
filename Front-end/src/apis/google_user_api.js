import axios from "axios";

class GoogleUserApi {
  static async getUser(userToken) {
    try {
      const response = await axios.get(
        `https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      throw error;
    }
  }
}

export default GoogleUserApi;
