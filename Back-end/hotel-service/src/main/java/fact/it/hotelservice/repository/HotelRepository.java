package fact.it.hotelservice.repository;

import fact.it.hotelservice.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    boolean existsByName(String name);
}
