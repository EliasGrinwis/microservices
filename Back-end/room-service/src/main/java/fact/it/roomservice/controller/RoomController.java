package fact.it.roomservice.controller;

import fact.it.roomservice.dto.RoomRequest;
import fact.it.roomservice.dto.RoomResponse;
import fact.it.roomservice.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<RoomResponse> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public RoomResponse getRoom(@PathVariable("id") Long id) {
        return roomService.getRoom(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public long createRoom(@RequestBody RoomRequest roomRequest) {
        return roomService.createRoom(roomRequest);
    }
}
