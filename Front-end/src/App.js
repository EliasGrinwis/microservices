import "./App.css";
import HotelList from "./components/hotel_list";
import heroImage from "./assets/hero.jpg"; // Update the path accordingly

function App() {
  return (
    <div>
      {/* Warm and professional hero background */}
      <div className="h-screen overflow-hidden relative">
        <img
          src={heroImage}
          alt="Luxurious hotel with swimming pool"
          className="w-full h-full object-cover filter brightness-90"
        />
        {/* Overlay to improve contrast */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Centered text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to Your Luxury Retreat
          </h1>
          <p className="text-md md:text-lg lg:text-xl mb-8">
            Indulge in the warmth and sophistication of our world-class hotels,
            where luxury meets comfort. Experience the extraordinary on your
            dream holiday.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 rounded-full">
            Explore Destinations
          </button>
        </div>
      </div>

      {/* Featured Hotels section with warm tones */}
      <div className="container mx-auto bg-white text-gray-800 p-8 text-center md:text-left mt-8">
        <div className="mb-6">
          <h2 class="text-3xl lg:text-4xl font-bold text-black">
            Featured Hotels
          </h2>
          <hr class="my-3 w-14 mx-auto md:mx-0  border-yellow-400 border" />
          <p class="text-custom-grey-text text-lg mb-6">
            Your perfect holiday destination awaits you.
          </p>
        </div>

        <HotelList />
      </div>
    </div>
  );
}

export default App;
