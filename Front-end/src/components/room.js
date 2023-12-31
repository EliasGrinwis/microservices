import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import HotelApi from "../apis/hotel_api";
import Loading from "./loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faBed,
  faExpandArrowsAlt,
  faTv,
  faKitchenSet,
} from "@fortawesome/free-solid-svg-icons";
import RoomApi from "../apis/room_api";
import Error from "./error";

function Room() {
  const {id} = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await HotelApi.getHotel(id);

        for (let i = 0; i < result.data.roomIds.length; i++) {
          const roomId = result.data.roomIds[i];
          const resultRoom = await RoomApi.getRoom(roomId);
          setRooms((prevRooms) => [...prevRooms, resultRoom.data]);
        }
        setHotel(result.data);
      } catch (error) {
        setErrorStatus(error.response.status);

        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="mt-10">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="mt-10">
        <Error statusCode={errorStatus} />
      </div>
    );

  return (
    <div className="w-[95%] lg:w-[85%] mx-auto max-w-[1650px]">
      <header className="mb-4 relative">
        <img
          className="h-72 w-full object-cover rounded-md"
          src={hotel && hotel.image}
          alt={hotel && hotel.name}
        />
        <h1 className="absolute w-full md:w-auto text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold bg-gray-800 bg-opacity-90 p-10">
          {hotel && hotel.name}
        </h1>
      </header>
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Available Rooms
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {hotel &&
            rooms.map((room, i) => (
              <div key={i} className="bg-gray-100 p-4 sm:p-6 rounded-md mb-4">
                <div className="flex flex-col sm:flex-row">
                  <div className="mb-4 sm:mb-0 sm:mr-4">
                    <img
                      className="w-full h-24 sm:w-44 sm:h-full object-cover rounded-md"
                      src={room.picture}
                      alt={room.name + " Image"}
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2 text-gray-800">
                      Room {i + 1}
                    </h1>
                    <p className="text-gray-600 mb-4">{room.description}</p>
                    <div className="flex flex-wrap items-center justify-between text-gray-800 p-2 rounded-md">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                        <span className="text-lg font-semibold">
                          {room.pricePerDay.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center mb-2 sm:mb-0">
                        <FontAwesomeIcon icon={faBed} className="mr-2" />
                        <span className="text-lg">
                          {room.amountOfBeds} beds
                        </span>
                      </div>
                      <div className="flex items-center mb-2 sm:mb-0">
                        <FontAwesomeIcon
                          icon={faExpandArrowsAlt}
                          className="mr-2"
                        />
                        <span className="text-lg">{room.roomSize} m²</span>
                      </div>
                      {room.television && (
                        <div className="flex items-center mb-2 sm:mb-0">
                          <FontAwesomeIcon icon={faTv} className="mr-2" />
                          <span className="text-sm">TV</span>
                        </div>
                      )}
                      {room.kitchen && (
                        <div className="flex items-center mb-2 sm:mb-0">
                          <FontAwesomeIcon
                            icon={faKitchenSet}
                            className="mr-2"
                          />
                          <span className="text-sm">Kitchen</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default Room;
