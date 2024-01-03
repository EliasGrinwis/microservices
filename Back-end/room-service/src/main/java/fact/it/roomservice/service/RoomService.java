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
            room.setDescription("Deluxe Room with City View");
            room.setPricePerDay(200);  // Adjusted for realism
            room.setAmountOfBeds(2);
            room.setRoomSize(30);  // Adjusted for realism
            room.setKitchen(true);
            room.setTelevision(true);
            room.setPicture("https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/kamer1.jpg?alt=media&token=09927356-3def-4eec-acec-680205bb2b12");
            roomRepository.save(room);

            Room room2 = new Room();
            room2.setDescription("Ocean View Suite");
            room2.setPricePerDay(349);  // Adjusted for realism
            room2.setAmountOfBeds(3);
            room2.setRoomSize(50);  // Adjusted for realism
            room2.setKitchen(true);
            room2.setTelevision(true);
            room2.setPicture("https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/ocean_view.jpg?alt=media&token=f7ac499f-a1a0-4f5d-b4f5-bb421a2f0308");
            roomRepository.save(room2);

            Room room3 = new Room();
            room3.setDescription("Beachfront Bungalow");
            room3.setPricePerDay(399);  // Adjusted for realism
            room3.setAmountOfBeds(2);
            room3.setRoomSize(40);  // Adjusted for realism
            room3.setKitchen(true);
            room3.setTelevision(true);
            room3.setPicture("https://firebasestorage.googleapis.com/v0/b/microservices-402412.appspot.com/o/bungalow.gif?alt=media&token=e6b13d97-524a-40d7-80b7-aa2e2e4487dd");

            roomRepository.save(room3);
        }
    }

    public List<RoomResponse> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();

        return rooms.stream()
                .map(room -> new RoomResponse(
                        room.getId(),
                        room.getDescription(),
                        room.getPricePerDay(),
                        room.getAmountOfBeds(),
                        room.getRoomSize(),
                        room.isKitchen(),
                        room.isTelevision(),
                        room.getPicture()
                ))
                .collect(Collectors.toList());
    }

    public RoomResponse getRoom(Long roomId) {
        Optional<Room> roomOptional = roomRepository.findById(roomId);

        if (roomOptional.isPresent()) {
            Room room = roomOptional.get();
            return new RoomResponse(room.getId(), room.getDescription(), room.getPricePerDay(), room.getAmountOfBeds(), room.getRoomSize(), room.isKitchen(), room.isTelevision(), room.getPicture());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Room not found");
        }
    }

    public long createRoom(RoomRequest roomRequest) {
        Room room = new Room();

        room.setDescription(roomRequest.getDescription());
        room.setPricePerDay(roomRequest.getPricePerDay());
        room.setAmountOfBeds(roomRequest.getAmountOfBeds());
        room.setRoomSize(roomRequest.getRoomSize());
        room.setKitchen(roomRequest.isKitchen());
        room.setTelevision(roomRequest.isTelevision());
        room.setPicture(roomRequest.getPicture());

        Room savedRoom = roomRepository.save(room);
        return savedRoom.getId();
    }
}
