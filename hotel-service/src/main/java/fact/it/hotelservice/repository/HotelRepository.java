package fact.it.hotelservice.repository;

import fact.it.hotelservice.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
}
