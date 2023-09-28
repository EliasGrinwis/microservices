package fact.it.hotelservice.controller;

import fact.it.hotelservice.dto.HotelResponse;
import fact.it.hotelservice.model.Hotel;
import fact.it.hotelservice.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotel")
@RequiredArgsConstructor
public class HotelController {

    private final HotelService hotelService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<HotelResponse> getAllHotels() {
        return hotelService.getAllHotels();
    }
}
