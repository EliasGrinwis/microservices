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
      // Add other needed properties from the customer object
    };

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(customerBaseUrl, customerData, config);
      console.log("Response Status:", response.status);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error; // You can handle the error further or rethrow it
    }
  }
}

export default CustomerApi;
