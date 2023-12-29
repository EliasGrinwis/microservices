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

## Endpoints 🛤️

API Gateway Entry Point: `https://api-gateway-eliasgrinwis.cloud.okteto.net`

**Rate limiter
All endpoints are equipped with a rate limiter to ensure fair usage and prevent abuse. This mechanism helps maintain the stability and performance of the API by restricting the number of requests a user or client can make within a specified time frame. Please adhere to the defined rate limits to optimize your experience with the API.

### Hotel Service 🏢

| Endpoint                        | Method | Description                                   | Auth Required | Image                                       |
| ------------------------------- | ------ | --------------------------------------------- | ------------- | -------------------------------------------- |
| `/hotels`              | GET    | Retrieve information about all the hotels. | No            | <img src="https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/hotels2.PNG?alt=media&token=0a6b608a-9ba9-4e95-b87e-dd074be237c6" width="200"> |
| `/hotels/{id}`         | GET    | Retrieve information about a specific hotel. | No            | <img src="https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/specific_hotel.PNG?alt=media&token=ffd92109-cc16-4184-a28a-19baf1522f05" width="200"> |
| `/hotels`              | POST   | Create an hotel. | Yes           | <img src="https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/hotel_post.PNG?alt=media&token=a33f9aa3-64d3-4405-9075-6b8c2c55e923" width="200"> |
| `/hotels/{id}`         | PUT    | Update an hotel. | Yes           | <img src="https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/update_hotel.PNG?alt=media&token=4b3cf3a4-959b-40bc-a401-74ae27f66882" width="200"> |
| `/hotels/{id}`         | DELETE    | Delete an hotel. | Yes          | <img src="https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/delete_hotel.PNG?alt=media&token=d1aa16d7-1ffb-41a1-ad15-14c4b649a707" width="200"> |

### Room Service 🛌

| Endpoint              | Method | Description                                  | Auth Required | Image                                |
| --------------------- | ------ | -------------------------------------------- | ------------- | ------------------------------------- |
| `/rooms`              | GET    | Retrieve information about all the rooms.    | No            | <img src="https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/rooms.PNG?alt=media&token=918bd9b8-4a77-4562-a7e8-8ef676d4a185" width="200"> |
| `/rooms/{id}`         | GET    | Retrieve information about a specific room.  | No            | <img src="https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/room_specific.PNG?alt=media&token=65da167d-048e-4f11-885c-de138d45ec7f" width="200"> |
| `/rooms`              | POST   | Create a room.                               | Yes           | <img src="https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/room_create.PNG?alt=media&token=37c184fd-d561-4688-b74e-1a677e7a3511" width="200"> |

### Customer Service 🧑

| Endpoint                  | Method | Description                                      | Auth Required | Image                                      |
| ------------------------- | ------ | ------------------------------------------------ | ------------- | ------------------------------------------- |
| `/customers`              | GET    | Retrieve information about all the customers.    | Yes            | <img src="https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/customers.PNG?alt=media&token=d4b5bcae-e6e2-4903-8add-718684beee82" width="200"> |
| `/customers`              | POST   | Create a customer.                               | Yes           | <img src="https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/create_customer.PNG?alt=media&token=5f3e4c9f-64b2-4e25-b8d6-c3c08ff70d6f" width="200"> |

