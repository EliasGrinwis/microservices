# Project Description

## Url 🔗

https://microservices-402412.web.app/

## Theme 🏨

In this project, I have developed a microservices-based system for managing hotel reservations. The system comprises three core microservices: `hotel-service`, `room-service`, and `customer-service`. Each of these microservices plays a crucial role in managing various aspects of hotel operations.

## Microservices and Components 🧩

### Hotel Service 🏢

The `hotel-service` microservice serves as the central repository for hotel-related information, including hotel locations, facilities, and room availability. It maintains data such as:

- Hotel locations and descriptions.
- Available room types and their amenities.
- Room availability and booking status.
- Customer reviews and ratings.

### Room Service 🛌

The `room-service` microservice is responsible for managing room-specific data, allowing fine-grained control over room types, pricing, and availability. It handles:

- Room types, including descriptions and features.
- Pricing and availability of individual rooms.
- Special room offers and discounts.
- Maintenance and cleaning schedules.

### Customer Service 🧑

The `customer-service` microservice is the primary interaction point for customers. It facilitates customer registration and profile management, ensuring seamless user experiences. It includes features such as:

- Customer registration and login.
- User profile management, including personal details and preferences.
- Booking history and reservation management.
- Secure payment processing and billing history.

### Gateway 🌐

To orchestrate and manage interactions between these microservices, I implemented an API Gateway 🌐. This gateway acts as a single entry point for clients and handles requests efficiently by routing them to the respective microservices.

**API Gateway Entry Point:** [https://api-gateway-eliasgrinwis.cloud.okteto.net/](https://api-gateway-eliasgrinwis.cloud.okteto.net/)

## Endpoints 🛤️

### Hotel Service

| Endpoint                        | Method | Description                                   | Image                                       |
| ------------------------------- | ------ | --------------------------------------------- | -------------------------------------------- |
| `/hotel/{hotelId}`              | GET    | Retrieve information about a specific hotel. | <img src="https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/hotels.PNG?alt=media&token=d034cfe2-c897-4d12-b771-a5628e25a51f" width="200"> |

### Room Service

| Endpoint              | Method | Description                             | Image                                |
| --------------------- | ------ | --------------------------------------- | ------------------------------------- |
| `/room/types`         | GET    | Get a list of available room types.     | <img src="YOUR_IMAGE_URL" width="200"> |
| `/room/book`          | POST   | Book a room for a specified duration.   | <img src="YOUR_IMAGE_URL" width="200"> |

### Customer Service

| Endpoint                  | Method | Description                         | Image                                      |
| ------------------------- | ------ | ----------------------------------- | ------------------------------------------- |
| `/customer/register`      | POST   | Register a new customer. 
