package fact.it.hotelservice.service;

import fact.it.hotelservice.dto.HotelRequest;
import fact.it.hotelservice.dto.HotelResponse;
import fact.it.hotelservice.model.Hotel;
import fact.it.hotelservice.repository.HotelRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
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
            Hotel hotel1 = new Hotel();
            hotel1.setName("Hotel Guayarmina Princess");
            hotel1.setDescription("Centrally located, the Greek-inspired Guayarmina Princess Hotel offers easy access to the beach, downtown, promenade, and attractions. Named after a Canarian princess, expect a regal stay.");
            hotel1.setCity("Costa Adeje");
            hotel1.setAddress("Guayarmina Princess, C. Londres, 1, 38670 Costa Adeje, Santa Cruz de Tenerife, Spanje");
            hotel1.setImage("https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/hotel1.jpg?alt=media&token=829a8e9e-dd28-47a4-af4e-100b81f0dc8f");
            hotel1.setRoomIds(List.of(1L));
            hotelRepository.save(hotel1);

            Hotel hotel2 = new Hotel();
            hotel2.setName("Luxury Resort Paradise");
            hotel2.setDescription("Indulge in the ultimate luxury experience at our resort paradise with breathtaking views.");
            hotel2.setCity("Side");
            hotel2.setAddress("Side, Horus Paradise Luxury Resort Hotel, İnönü Blv. No:35-1 D:1, 07330 Manavgat/Antalya, Turkije");
            hotel2.setImage("https://images2.bovpg.net/fwxl/media/1/3/8/7/8/387829.jpg");
            hotel2.setRoomIds(List.of(2L, 3L));
            hotelRepository.save(hotel2);
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
                        hotel.getImage(),
                        hotel.getRoomIds()

                ))
                .collect(Collectors.toList());
    }

    public HotelResponse getHotel(Long hotelId) {
        Optional<Hotel> hotelOptional = hotelRepository.findById(hotelId);

        if (hotelOptional.isPresent()) {
            Hotel hotel = hotelOptional.get();
            return new HotelResponse(hotel.getId(),
                    hotel.getName(),
                    hotel.getDescription(),
                    hotel.getCity(),
                    hotel.getAddress(),
                    hotel.getImage(),
                    hotel.getRoomIds()
            );
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel not found");
        }
    }

    public boolean createHotel(HotelRequest hotelRequest) {
        Hotel hotel = new Hotel();

        hotel.setName(hotelRequest.getName());
        hotel.setDescription(hotelRequest.getDescription());
        hotel.setAddress(hotelRequest.getAddress());
        hotel.setCity(hotelRequest.getCity());
        hotel.setImage(hotelRequest.getImage());

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
            existingHotel.setDescription(updatedHotel.getDescription());
            existingHotel.setAddress(updatedHotel.getAddress());
            existingHotel.setCity(updatedHotel.getCity());
            existingHotel.setImage(updatedHotel.getImage());
            existingHotel.setRoomIds(updatedHotel.getRoomIds());

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
