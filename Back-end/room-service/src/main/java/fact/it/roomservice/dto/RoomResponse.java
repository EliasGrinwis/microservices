package fact.it.roomservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomResponse {
    private double pricePerDay;
    private int amountOfBeds;
    private int roomSize;
    private boolean isKitchen;
    private boolean isTelevision;
}
