package fact.it.hotelservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelRequest {
    private String name;
    private String description;
    private String city;
    private String address;
    private String image;
}