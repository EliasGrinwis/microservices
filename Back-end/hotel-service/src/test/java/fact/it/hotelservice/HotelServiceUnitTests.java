package fact.it.hotelservice;

import fact.it.hotelservice.dto.HotelRequest;
import fact.it.hotelservice.model.Hotel;
import fact.it.hotelservice.repository.HotelRepository;
import fact.it.hotelservice.service.HotelService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.reactive.function.client.WebClient;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class HotelServiceUnitTests {

	@InjectMocks
	private HotelService hotelService;

	@Mock
	private HotelRepository hotelRepository;

	@Mock
	private WebClient webClient;
	@Mock
	private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;

	@Mock
	private WebClient.RequestHeadersSpec requestHeadersSpec;

	@Mock
	private WebClient.ResponseSpec responseSpec;

	@BeforeEach
	void setUp() {
		ReflectionTestUtils.setField(hotelService, "customerServiceBaseUrl", "http://localhost:8080");
		ReflectionTestUtils.setField(hotelService, "roomServiceBaseUrl", "http://localhost:8082");
	}

	@Test
	public void testCreateHotel_Success() {
		// Arrange
		String name = "hotel1";
		String address = "Voetbalstraat 25, 2560 Nijlen";

		HotelRequest hotelRequest = new HotelRequest();
		hotelRequest.setName(name);
		hotelRequest.setAddress(address);

		// Act
		boolean result = hotelService.createHotel(hotelRequest);

		// Assert
		assertTrue(result);
		verify(hotelRepository, times(1)).save(any(Hotel.class));

	}

}
