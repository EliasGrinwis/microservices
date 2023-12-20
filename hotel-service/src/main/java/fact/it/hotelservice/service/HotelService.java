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
        if(hotelRepository.count() <= 0){
            Hotel hotel = new Hotel();
            hotel.setName("Test hotel");
            hotel.setAddress("Goorerf 27 2560 Nijlen");

            hotelRepository.save(hotel);
        }
    }

    public List<HotelResponse> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();

        return hotels.stream()
                .map(hotel -> new HotelResponse(
                        hotel.getId(),
                        hotel.getName(),
                        hotel.getAddress()
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
