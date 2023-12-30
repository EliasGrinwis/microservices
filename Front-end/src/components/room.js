import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import HotelApi from "../apis/hotel_api";
import Loading from "./loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faBed,
  faExpandArrowsAlt,
  faHome,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import RoomApi from "../apis/room_api";

function Room() {
  const {id} = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("one");
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await HotelApi.getHotel(id);

        for (let i = 0; i < result.data.roomIds.length; i++) {
          const roomId = result.data.roomIds[i];
          const resultRoom = await RoomApi.getRoom(roomId);
          console.log(resultRoom.data);
          setRooms((prevRooms) => [...prevRooms, resultRoom.data]);
        }
        setHotel(result.data);
      } catch (error) {
        console.log(error.message);
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
      <section className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Available Rooms
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {hotel &&
            rooms.map((room, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-md shadow-md shadow-gray-400 mb-4 sm:flex">
                <div>
                  <img
                    className="w-full h-24 sm:w-40 sm:h-full object-cover rounded-md mr-4"
                    src="https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/images%2Fsnow.jpg?alt=media&token=ed3e7712-a141-41a3-919c-204e3326f20e"
                    alt={room.name + "Image"}
                  />
                </div>
                <div className="">
                  <h1 className="text-2xl font-bold mb-2 text-gray-800">
                    Room {i + 1}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {room.description}. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faDollarSign}
                        className="mr-2 text-gray-800"
                      />
                      <span className="text-lg font-semibold">
                        {room.pricePerDay.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faBed}
                        className="mr-2 text-gray-800"
                      />
                      <span className="text-lg">{room.amountOfBeds} beds</span>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faExpandArrowsAlt}
                        className="mr-2 text-gray-800"
                      />
                      <span className="text-lg">{room.roomSize} m²</span>
                    </div>
                    <div className="flex items-center">
                      {room.television ? (
                        <FontAwesomeIcon
                          icon={faTv}
                          className="mr-2 text-gray-800"
                        />
                      ) : null}
                    </div>
                    <div className="flex items-center">
                      {room.kitchen ? (
                        <FontAwesomeIcon
                          icon={faHome}
                          className="mr-2 text-gray-800"
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md"
                      onClick={() => console.log("Book Now")}>
                      Book Now
                    </button>
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
