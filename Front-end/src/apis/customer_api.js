import axios from "axios";
import configData from "../config/api.json";

const customerBaseUrl = configData.api + "customers";

class CustomerApi {
  static getCustomers(userToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };

    return axios.get(customerBaseUrl, config);
  }

  static async createCustomer(customer, userToken) {
    let firstName = customer.given_name;
    let lastName = customer.family_name;
    let email = customer.email;
    let picture = customer.picture;

    const customerData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      picture: picture,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(customerBaseUrl, customerData, config);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

export default CustomerApi;
