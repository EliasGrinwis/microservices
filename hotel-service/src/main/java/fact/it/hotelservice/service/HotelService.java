package fact.it.hotelservice.service;

import fact.it.hotelservice.dto.HotelResponse;
import fact.it.hotelservice.model.Hotel;
import fact.it.hotelservice.repository.HotelRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class HotelService {

    private final HotelRepository hotelRepository;

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
                        hotel.getName(),
                        hotel.getAddress()
                ))
                .collect(Collectors.toList());
    }
}
