package fact.it.hotelservice;

import fact.it.hotelservice.dto.HotelRequest;
import fact.it.hotelservice.dto.HotelResponse;
import fact.it.hotelservice.model.Hotel;
import fact.it.hotelservice.repository.HotelRepository;
import fact.it.hotelservice.service.HotelService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class HotelServiceUnitTests {

	@InjectMocks
	private HotelService hotelService;

	@Mock
	private HotelRepository hotelRepository;

	@BeforeEach
	void setUp() {
		ReflectionTestUtils.setField(hotelService, "customerServiceBaseUrl", "http://localhost:8080");
		ReflectionTestUtils.setField(hotelService, "roomServiceBaseUrl", "http://localhost:8082");
	}

	@Test
	public void testGetAllHotels() {
		// Arrange
		List<Hotel> mockHotels = Arrays.asList(
				new Hotel(1L, "Grand Plaza Hotel", "Luxurious hotel in the heart of the city", "Cityville", "123 Main Street", "image-url-1", Arrays.asList(101L, 102L)),
				new Hotel(2L, "Luxury Inn", "Modern hotel with great amenities", "Downtown", "456 Business Avenue", "image-url-2", Arrays.asList(201L, 202L))
				// Add more mock data as needed
		);
		when(hotelRepository.findAll()).thenReturn(mockHotels);

		// Act
		List<HotelResponse> result = hotelService.getAllHotels();

		// Assert
		assertEquals(mockHotels.size(), result.size());
	}

	@Test
	void testGetHotel() {
		// Arrange
		Long hotelId = 1L;
		Hotel mockHotel = new Hotel(1L, "Grand Plaza Hotel", "Luxurious hotel in the heart of the city", "Cityville", "123 Main Street", "image-url-1", Arrays.asList(101L, 102L));
		when(hotelRepository.findById(hotelId)).thenReturn(Optional.of(mockHotel));

		// Act
		HotelResponse result = hotelService.getHotel(hotelId);

		// Assert
		assertEquals(mockHotel.getId(), result.getId());
	}

	@Test
	public void testCreateHotel() {
		// Arrange
		String name = "Grand Plaza Hotel";
		String address = "123 Main Street, Cityville";

		HotelRequest hotelRequest = new HotelRequest();
		hotelRequest.setName(name);
		hotelRequest.setAddress(address);

		// Act
		boolean result = hotelService.createHotel(hotelRequest);

		// Assert
		assertTrue(result);
		verify(hotelRepository, times(1)).save(any(Hotel.class));

	}

	@Test
	public void testUpdateHotel() {
		// Arrange
		Long hotelId = 1L;
		Hotel updatedHotel = new Hotel();
		updatedHotel.setName("Updated Hotel");
		updatedHotel.setAddress("Updated Address");

		// Mock the behavior of findById and save methods
		when(hotelRepository.findById(hotelId)).thenReturn(Optional.of(new Hotel()));
		when(hotelRepository.save(any(Hotel.class))).thenAnswer(invocation -> {
			Hotel savedHotel = invocation.getArgument(0);
			savedHotel.setId(hotelId);
			return savedHotel;
		});

		// Act
		Hotel result = hotelService.updateHotel(updatedHotel, hotelId);

		// Assert
		assertNotNull(result);
		assertEquals(updatedHotel.getName(), result.getName());
		assertEquals(updatedHotel.getAddress(), result.getAddress());
		verify(hotelRepository, times(1)).save(any(Hotel.class));
	}

	@Test
	public void testDeleteHotel() {
		// Arrange
		Long hotelId = 1L;
		when(hotelRepository.findById(hotelId)).thenReturn(Optional.of(new Hotel()));

		// Act
		boolean result = hotelService.deleteHotel(hotelId);

		// Assert
		assertTrue(result);
		verify(hotelRepository, times(1)).delete(any(Hotel.class));
	}
}
