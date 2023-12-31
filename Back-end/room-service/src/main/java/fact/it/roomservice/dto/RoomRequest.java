package fact.it.roomservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequest {
    private String description;
    private double pricePerDay;
    private int amountOfBeds;
    private int roomSize;
    private boolean kitchen;
    private boolean television;
    private String picture;
}
