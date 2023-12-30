import React, {useState, useEffect} from "react";
import HotelApi from "../apis/hotel_api";
import Loading from "../components/loading";
import Error from "../components/error";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBed, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

function HotelList() {
  const [hotels, setHotels] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await HotelApi.getHotels();
        setHotels(result);
      } catch (error) {
        setErrorStatus(error.response.status);

        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error statusCode={errorStatus} />;

  const output = hotels.map((hotel, i) => (
    <div
      key={i}
      className="my-6 relative bg-white rounded-xl overflow-hidden shadow-md shadow-gray-400">
      <img
        className="w-full h-56 object-cover"
        src={hotel.image}
        alt={hotel.name}
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 overflow-hidden">
          {hotel.name}
        </h2>
        <div className="flex items-center justify-between mb-4 text-gray-500">
          <div className="flex items-center">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              {hotel.city}
            </span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBed} className="mr-2" />

            <span>
              {Object.keys(hotel.rooms).length === 1
                ? Object.keys(hotel.rooms).length + " room"
                : Object.keys(hotel.rooms).length + " rooms"}
            </span>
          </div>
        </div>
        <p className="text-gray-700 mb-16 overflow-hidden">
          {hotel.description}
        </p>
        <div className="absolute bottom-5 right-6">
          <Link to={"hotel/" + hotel.id}>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-md">
              View Rooms
            </button>
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {output}
    </div>
  );
}

export default HotelList;
