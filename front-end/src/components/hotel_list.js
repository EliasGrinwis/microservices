import React, {useState, useEffect} from "react";
import HotelApi from "../apis/hotel_api";
import Loading from "./Loading";
import Error from "./Error";

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
    <div key={hotel.id} className="columns large-2 medium-4">
      {hotel.name}
    </div>
  ));

  return <div>{output}</div>;
}

export default HotelList;
