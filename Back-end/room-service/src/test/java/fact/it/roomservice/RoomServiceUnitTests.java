package fact.it.roomservice;

import fact.it.roomservice.dto.RoomRequest;
import fact.it.roomservice.dto.RoomResponse;
import fact.it.roomservice.model.Room;
import fact.it.roomservice.repository.RoomRepository;
import fact.it.roomservice.service.RoomService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class RoomServiceUnitTests {

	@InjectMocks
	private RoomService roomService;

	@Mock
	private RoomRepository roomRepository;

	@Test
	public void testGetAllRooms() {
		// Arrange
		List<Room> mockRooms = Arrays.asList(
				new Room(1L, "test description", 100.0, 1, 20, true, true, ""),
				new Room(2L, "test description2", 150.0, 2, 30, false, true, "")
				// Add more mock data as needed
		);
		when(roomRepository.findAll()).thenReturn(mockRooms);

		// Act
		List<RoomResponse> result = roomService.getAllRooms();

		// Assert
		assertEquals(mockRooms.size(), result.size());
	}

	@Test
	public void testGetRoom() {
		// Arrange
		Long roomId = 1L;
		Room mockRoom = new Room(roomId, "test description", 100.0, 1, 20, true, true, "");
		when(roomRepository.findById(roomId)).thenReturn(Optional.of(mockRoom));

		// Act
		RoomResponse result = roomService.getRoom(roomId);

		// Assert
		assertEquals(mockRoom.getId(), result.getId());
		// Add more assertions based on your mapping logic
	}

	@Test
	public void testCreateRoom() {
		// Arrange
		RoomRequest roomRequest = new RoomRequest("test description", 100.0, 1, 20, true, true, "");
		when(roomRepository.save(any(Room.class))).thenReturn(new Room(1L, "test description", 100.0, 1, 20, true, true, ""));

		// Act
		long result = roomService.createRoom(roomRequest);

		// Assert
		assertEquals(1L, result);
	}
}
