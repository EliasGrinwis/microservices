package fact.it.roomservice.service;

import fact.it.roomservice.dto.RoomResponse;
import fact.it.roomservice.model.Room;
import fact.it.roomservice.repository.RoomRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomService {

    private final RoomRepository roomRepository;

    @PostConstruct
    public void loadData() {
        if(roomRepository.count() <= 0){
            Room room = new Room();
            room.setPricePerDay(59);
            room.setAmountOfBeds(3);
            room.setRoomSize(300);
            room.setKitchen(false);
            room.setTelevision(true);


            roomRepository.save(room);
        }
    }

    public List<RoomResponse> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();

        return rooms.stream()
                .map(room -> new RoomResponse(
                        room.getPricePerDay(),
                        room.getAmountOfBeds(),
                        room.getRoomSize(),
                        room.isKitchen(),
                        room.isTelevision()
                ))
                .collect(Collectors.toList());
    }
}
