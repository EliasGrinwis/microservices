import React, {useState, useEffect} from "react";
import HotelApi from "../apis/hotel_api";
import Loading from "../components/loading";
import Error from "../components/error";
import heroImage from "../assets/hero.jpg"; // Update the path accordingly

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await HotelApi.getHotels();
        setHotels(result.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  const output = hotels.map((hotel) => (
    <div
      key={hotel.id}
      className="my-6 bg-white rounded-xl overflow-hidden shadow-md">
      <img
        className="w-full h-56 object-cover"
        src={heroImage}
        alt={hotel.name}
      />
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{hotel.name}</h2>
        </div>
        <p className="text-gray-700 mb-6">{hotel.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {hotel.city}
            </span>
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
