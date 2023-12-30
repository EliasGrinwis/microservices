package fact.it.roomservice.service;

import fact.it.roomservice.dto.RoomRequest;
import fact.it.roomservice.dto.RoomResponse;
import fact.it.roomservice.model.Room;
import fact.it.roomservice.repository.RoomRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomService {

    @Autowired
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
                        room.getId(),
                        room.getPricePerDay(),
                        room.getAmountOfBeds(),
                        room.getRoomSize(),
                        room.isKitchen(),
                        room.isTelevision()
                ))
                .collect(Collectors.toList());
    }

    public RoomResponse getRoom(Long roomId) {
        Optional<Room> roomOptional = roomRepository.findById(roomId);

        if (roomOptional.isPresent()) {
            Room room = roomOptional.get();
            return new RoomResponse(room.getId(), room.getPricePerDay(), room.getAmountOfBeds(), room.getRoomSize(), room.isKitchen(), room.isTelevision());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Room not found");
        }
    }

    public long createRoom(RoomRequest roomRequest) {
        Room room = new Room();

        System.out.println(roomRequest.isKitchen());  // Print the value to the console

        room.setPricePerDay(roomRequest.getPricePerDay());
        room.setAmountOfBeds(roomRequest.getAmountOfBeds());
        room.setRoomSize(roomRequest.getRoomSize());
        room.setKitchen(roomRequest.isKitchen());
        room.setTelevision(roomRequest.isTelevision());

        Room savedRoom = roomRepository.save(room);
        return savedRoom.getId();
    }
}
