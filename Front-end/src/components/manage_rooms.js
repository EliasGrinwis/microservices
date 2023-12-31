import React, {useState, useEffect} from "react";
import Loading from "../components/loading";
import Error from "../components/error";
import RoomApi from "../apis/room_api";
import HotelApi from "../apis/hotel_api";

function ManageRooms({userToken}) {
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [newRoomData, setNewRoomData] = useState({
    pricePerDay: "",
    amountOfBeds: "",
    roomSize: "",
    kitchen: "",
    television: "",
  });
  const [hotel, setHotel] = useState({
    hotelId: 0,
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await RoomApi.getRooms();
        const resultHotels = await HotelApi.getHotels();

        setRooms(result.data);
        setHotels(resultHotels);
      } catch (error) {
        setErrorStatus(error.response.status);
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const showCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateRoom = async () => {
    try {
      console.log(newRoomData);
      // Create a new room
      const createdRoomResponse = await RoomApi.createRoom(
        newRoomData,
        userToken
      );
      const createdRoomId = createdRoomResponse.data;

      // Get the current hotel data
      const hotelResponse = await HotelApi.getHotel(hotel.hotelId);
      const currentHotel = hotelResponse.data;

      // Add the new room's ID to the hotel's roomIds array
      currentHotel.roomIds.push(createdRoomId);

      // Update the hotel with the modified data
      await HotelApi.updateHotel(currentHotel, userToken);

      closeCreateModal();
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error statusCode={errorStatus} />;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Manage Rooms</h1>
      <div className="mb-3 text-end">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={showCreateModal}>
          Create
        </button>
      </div>
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create Room</h2>

            {/* Form fields for new hotel data */}
            <div className="mb-2">
              <label
                htmlFor="pricePerDay"
                className="block text-sm font-medium text-gray-700">
                Price per day
              </label>
              <input
                type="text"
                id="pricePerDay"
                placeholder="Enter price per day"
                value={newRoomData.pricePerDay}
                onChange={(e) =>
                  setNewRoomData({...newRoomData, pricePerDay: e.target.value})
                }
                className="mt-1 p-2 border w-full"
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="amountOfBeds"
                className="block text-sm font-medium text-gray-700">
                Amount of beds
              </label>
              <input
                type="text"
                id="amountOfBeds"
                placeholder="Enter amount of beds"
                value={newRoomData.amountOfBeds}
                onChange={(e) =>
                  setNewRoomData({
                    ...newRoomData,
                    amountOfBeds: e.target.value,
                  })
                }
                className="mt-1 p-2 border w-full"
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="roomSize"
                className="block text-sm font-medium text-gray-700">
                Room size
              </label>
              <input
                type="text"
                id="roomSize"
                placeholder="Enter room size"
                value={newRoomData.roomSize}
                onChange={(e) =>
                  setNewRoomData({...newRoomData, roomSize: e.target.value})
                }
                className="mt-1 p-2 border w-full"
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="isKitchen"
                className="block text-sm font-medium text-gray-700">
                Kitchen
              </label>
              <select
                id="isKitchen"
                value={newRoomData.kitchen}
                onChange={(e) =>
                  setNewRoomData({...newRoomData, kitchen: e.target.value})
                }
                className="mt-1 p-2 border w-full">
                <option selected value="">
                  Select an option
                </option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>

            <div className="mb-2">
              <label
                htmlFor="isTelevision"
                className="block text-sm font-medium text-gray-700">
                Television
              </label>
              <select
                id="isTelevision"
                value={newRoomData.television}
                onChange={(e) =>
                  setNewRoomData({
                    ...newRoomData,
                    television: e.target.value === "true",
                  })
                }
                className="mt-1 p-2 border w-full">
                <option selected value="">
                  Select an option
                </option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            <div className="mb-2">
              <label
                htmlFor="hotel"
                className="block text-sm font-medium text-gray-700">
                Which hotel belongs to this room?
              </label>
              <select
                id="hotelId"
                value={hotel.hotelId}
                onChange={(e) => setHotel({...hotel, hotelId: e.target.value})}
                className="mt-1 p-2 border w-full">
                <option value="">Select an option</option>
                {hotels.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons for creating and canceling */}
            <div className="flex mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleCreateRoom}>
                Create Room
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                onClick={closeCreateModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Price per day</th>
            <th className="border p-2 text-left">Amount of beds</th>
            <th className="border p-2 text-left">Room size</th>
            <th className="border p-2 text-left">Kitchen</th>
            <th className="border p-2 text-left">Television</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="border p-2">{room.pricePerDay}</td>
              <td className="border p-2">{room.amountOfBeds}</td>
              <td className="border p-2">{room.roomSize}</td>
              <td className="border p-2">{room.kitchen.toString()}</td>
              <td className="border p-2">{room.television.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageRooms;
