import React, {useState, useEffect} from "react";
import HotelApi from "../apis/hotel_api";
import Loading from "../components/loading";
import Error from "../components/error";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBed} from "@fortawesome/free-solid-svg-icons";

function HotelList() {
  const [hotels, setHotels] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await HotelApi.getHotels();
        setHotels(result);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  const output = hotels.map((hotel, i) => (
    <div
      key={i}
      className="my-6 bg-white rounded-xl overflow-hidden shadow-md grid grid-cols-1">
      <img
        className="w-full h-56 object-cover"
        src={hotel.image}
        alt={hotel.name}
      />
      <div className="p-6 flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold h-9 overflow-hidden">
            {hotel.name}
          </h2>
        </div>
        <p className="text-gray-700 mb-8 flex-grow overflow-hidden">
          {hotel.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {hotel.city}
            </span>
          </div>
          <div className="flex items-center gap-10">
            <p className="text-gray-700">
              <FontAwesomeIcon icon={faBed} className="mr-2" />
              {Object.keys(hotel.rooms).length}
            </p>
          </div>
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
