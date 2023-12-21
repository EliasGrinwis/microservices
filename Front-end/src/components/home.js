import React from "react";
import heroImage from "../assets/hero.jpg"; // Update the path accordingly
import HotelList from "../components/hotel_list";

function Home() {
  return (
    <div>
      <div className="h-[70vh] overflow-hidden relative">
        <img
          src={heroImage}
          alt="Luxurious hotel with swimming pool"
          className="w-full h-full object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to Your Luxury Retreat
          </h1>
          <p className="text-md md:text-lg lg:text-xl mb-8">
            Indulge in the warmth and sophistication of our world-class hotels,
            where luxury meets comfort. Experience the extraordinary on your
            dream holiday.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 rounded-full">
            Explore Hotels
          </button>
        </div>
      </div>

      <div className="container mx-auto bg-white text-gray-800 text-center md:text-left mt-8">
        <div className="mb-3">
          <h2 className="text-3xl lg:text-4xl font-bold text-black">
            Featured Hotels
          </h2>
          <hr className="my-3 w-14 mx-auto md:mx-0  border-yellow-400 border" />
          <p className="text-custom-grey-text text-lg">
            Your perfect holiday destination awaits you.
          </p>
        </div>

        <HotelList />
      </div>
    </div>
  );
}

export default Home;
