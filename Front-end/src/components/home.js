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

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 w-[95%] lg:w-[85%] mx-auto max-w-[950px] bg-gray-800 bg-opacity-70 rounded-lg p-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to HotelHub
          </h1>
          <p className="text-md md:text-lg lg:text-xl mb-8 text-gray-300">
            Explore cozy comfort at HotelHub. Your ideal retreat for a relaxing
            getaway!
          </p>
          <a href="#featured-hotels">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-full">
              Explore Hotels
            </button>
          </a>
        </div>
      </div>

      <div
        id="featured-hotels"
        className="w-[95%] lg:w-[85%] mx-auto max-w-[1650px] bg-white text-gray-800 text-center md:text-left mt-8">
        <div className="mb-3">
          <h2 className="text-3xl lg:text-4xl font-bold text-black">
            Featured Hotels
          </h2>
          <hr className="my-3 w-14 mx-auto md:mx-0  border-indigo-600 border" />
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
