package fact.it.hotelservice.service;

import fact.it.hotelservice.dto.HotelRequest;
import fact.it.hotelservice.dto.HotelResponse;
import fact.it.hotelservice.model.Hotel;
import fact.it.hotelservice.repository.HotelRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class HotelService {

    private final HotelRepository hotelRepository;

    @Value("${customerservice.baseurl}")
    private String customerServiceBaseUrl;

    @Value("${roomservice.baseurl}")
    private String roomServiceBaseUrl;

    @PostConstruct
    public void loadData() {
        hotelRepository.deleteAll();
        if(hotelRepository.count() <= 0){
            Hotel hotel = new Hotel();
            hotel.setName("Grand Hotel Riviera");
            hotel.setDescription("Experience luxury and comfort at the Grand Hotel Riviera, located in the heart of Amsterdam.");
            hotel.setCity("Amsterdam");
            hotel.setAddress("Keizersgracht 123, 1015 CJ Amsterdam, Netherlands");
            hotel.setImage("https://firebasestorage.googleapis.com/v0/b/microservices-ea59d.appspot.com/o/riviera.jpg?alt=media&token=5c3161fc-e82f-4f6a-97fb-94c8c7a111f6");

            hotelRepository.save(hotel);
        }
    }

    public List<HotelResponse> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();

        return hotels.stream()
                .map(hotel -> new HotelResponse(
                        hotel.getId(),
                        hotel.getName(),
                        hotel.getDescription(),
                        hotel.getCity(),
                        hotel.getAddress(),
                        hotel.getImage()

                ))
                .collect(Collectors.toList());
    }

    public boolean createHotel(HotelRequest hotelRequest) {
        Hotel hotel = new Hotel();

        hotel.setName(hotelRequest.getName());
        hotel.setAddress(hotelRequest.getAddress());

        if (!hotelRepository.existsByName(hotel.getName())) {
            hotelRepository.save(hotel);
            return true;
        }
        return false;
    }

    public Hotel updateHotel(Hotel updatedHotel, Long hotelId) {
        Optional<Hotel> existingHotelOptional = hotelRepository.findById(hotelId);

        if (existingHotelOptional.isPresent()) {
            Hotel existingHotel = existingHotelOptional.get();

            existingHotel.setName(updatedHotel.getName());
            existingHotel.setAddress(updatedHotel.getAddress());

            return hotelRepository.save(existingHotel);
        } else {
            return null;
        }
    }

    public boolean deleteHotel(Long hotelId) {
        Optional<Hotel> optionalHotel = hotelRepository.findById(hotelId);

        if (optionalHotel.isPresent()) {
            Hotel hotel = optionalHotel.get();

            hotelRepository.delete(hotel);

            return true;
        } else {
            return false;
        }
    }
}