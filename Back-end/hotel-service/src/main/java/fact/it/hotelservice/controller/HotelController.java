package fact.it.hotelservice.controller;

import fact.it.hotelservice.dto.HotelRequest;
import fact.it.hotelservice.dto.HotelResponse;
import fact.it.hotelservice.model.Hotel;
import fact.it.hotelservice.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "https://microservices-402412.web.app")
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

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public String createHotel(@RequestBody HotelRequest hotelRequest) {
        boolean result = hotelService.createHotel(hotelRequest);

        return (result ? "Hotel created successfully" : "Hotel failed. Name already in use.");
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> updateHotel(@RequestBody Hotel updateHotel, @PathVariable("id") Long hotelId) {
        Hotel updatedHotel = hotelService.updateHotel(updateHotel, hotelId);

        if (updatedHotel != null) {
            return ResponseEntity.ok("Hotel updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel not found");
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deleteHotel(@PathVariable("id") Long hotelId) {
        boolean deleted = hotelService.deleteHotel(hotelId);

        if (deleted) {
            return ResponseEntity.ok("Hotel deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel not found");
        }
    }

}
