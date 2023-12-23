package fact.it.hotelservice.dto;

import jakarta.persistence.ElementCollection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelResponse {
    private Long id;
    private String name;
    private String description;
    private String city;
    private String address;
    private String image;

    @ElementCollection
    private List<Long> roomIds;
}
