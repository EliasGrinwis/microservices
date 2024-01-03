import React, {useState, useEffect} from "react";
import HotelApi from "../apis/hotel_api";
import Loading from "../components/loading";
import Error from "../components/error";
import {storage, ref, uploadBytes, getDownloadURL} from "../config/firebase";
import {faAdd, faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ManageHotels({userToken}) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newHotelData, setNewHotelData] = useState({
    name: "",
    description: "",
    city: "",
    address: "",
    image: "",
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
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

  const showCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setEdit(false);
    setNewHotelData({
      name: "",
      description: "",
      city: "",
      address: "",
      image: "",
    });
    setIsCreateModalOpen(false);
  };

  const handleCreateHotel = async () => {
    try {
      // Upload the image to Firebase Storage
      const storageRef = ref(storage, `images/${newHotelData.image.name}`);
      await uploadBytes(storageRef, newHotelData.image);

      // Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Create a new hotel object with the image URL
      const hotelWithImage = {...newHotelData, image: imageUrl};

      // Send a request to create a new hotel with the updated data
      await HotelApi.createHotel(hotelWithImage, userToken);

      // Close the modal after creating the hotel
      closeCreateModal();
    } catch (error) {
      console.error("Error creating hotel:", error);
    }
  };

  const handleOpenEditHotel = async (hotelId) => {
    try {
      const result = await HotelApi.getHotel(hotelId);
      console.log(result.data);
      setNewHotelData(result.data);
    } catch (error) {
      setErrorStatus(error.response.status);
      setError(true);
    }
    setEdit(true);
    setIsCreateModalOpen(true);
  };

  const handleEditHotel = async () => {
    try {
      const storageRef = ref(storage, `images/${newHotelData.image.name}`);
      await uploadBytes(storageRef, newHotelData.image);

      // Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Create a new hotel object with the image URL
      const hotelWithImage = {...newHotelData, image: imageUrl};

      await HotelApi.updateHotel(hotelWithImage, userToken);

      closeCreateModal();
    } catch (error) {
      setErrorStatus(error.response.status);
      setError(true);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    try {
      // Send a request to delete the hotel with the specified ID
      await HotelApi.deleteHotel(hotelId, userToken);
      // Update the state to reflect the deletion
      setHotels((prevHotels) =>
        prevHotels.filter((hotel) => hotel.id !== hotelId)
      );
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error statusCode={errorStatus} />;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Manage Hotels</h1>
      <div className="mb-3 flex justify-end">
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded flex items-center"
          onClick={showCreateModal}>
          <FontAwesomeIcon icon={faAdd} className="mr-2 text-lg" />
          <p className="ml-auto">Create</p>
        </button>
      </div>
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg sm:w-[40%]">
            {edit ? (
              <h2 className="text-2xl font-bold mb-4">Edit Hotel</h2>
            ) : (
              <h2 className="text-2xl font-bold mb-4">Create Hotel</h2>
            )}

            {/* Form fields for new hotel data */}
            <div className="mb-2">
              <label
                htmlFor="hotelName"
                className="block text-sm font-medium text-gray-700">
                Hotel Name
              </label>
              <input
                type="text"
                id="hotelName"
                placeholder="Enter hotel name"
                value={newHotelData.name}
                onChange={(e) =>
                  setNewHotelData({...newHotelData, name: e.target.value})
                }
                className="mt-1 p-2 border w-full"
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                id="description"
                placeholder="Enter description"
                value={newHotelData.description}
                onChange={(e) =>
                  setNewHotelData({
                    ...newHotelData,
                    description: e.target.value,
                  })
                }
                className="mt-1 p-2 border w-full"
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter city"
                value={newHotelData.city}
                onChange={(e) =>
                  setNewHotelData({...newHotelData, city: e.target.value})
                }
                className="mt-1 p-2 border w-full"
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter address"
                value={newHotelData.address}
                onChange={(e) =>
                  setNewHotelData({...newHotelData, address: e.target.value})
                }
                className="mt-1 p-2 border w-full"
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <div className="flex items-center mt-1">
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
                  Choose File
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setNewHotelData({...newHotelData, image: file});
                  }}
                  className="hidden"
                />
                <span className="ml-2">
                  {newHotelData.image
                    ? newHotelData.image.name
                    : "No file chosen"}
                </span>
              </div>
            </div>

            {/* Buttons for creating and canceling */}
            <div className="flex mt-4">
              {edit ? (
                <button
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
                  onClick={handleEditHotel}>
                  Update Hotel
                </button>
              ) : (
                <button
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
                  onClick={handleCreateHotel}>
                  Create Hotel
                </button>
              )}

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
            <th className="border p-2 text-left">Hotel Name</th>
            <th className="border p-2 text-left">Location</th>
            <th className="border p-2 text-left">Amount of rooms</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id}>
              <td className="border p-2">{hotel.name}</td>
              <td className="border p-2">{hotel.address}</td>
              <td className="border p-2"> {Object.keys(hotel.rooms).length}</td>
              <td className="border p-2">
                <div className="flex items-center justify-start gap-4">
                  <div>
                    <button
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                      onClick={() => handleOpenEditHotel(hotel.id)}>
                      <FontAwesomeIcon icon={faEdit} className="mr-2 text-lg" />
                      <p className="ml-auto">Edit</p>
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                      onClick={() => handleDeleteHotel(hotel.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="mr-2 text-lg"
                      />
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageHotels;
