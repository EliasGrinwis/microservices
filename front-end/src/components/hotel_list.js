import React, {useState, useEffect} from "react";
import HotelApi from "../apis/hotel_api";

function HotelList() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HotelApi.getHotels();
        setHotels(result.data.list);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchData();
  }, []);

  const output = hotels.map((hotel, i) => (
    <div key={i} className="columns large-2 medium-4">
      {hotel}
    </div>
  ));

  return <div>{output}</div>;
}

export default HotelList;
