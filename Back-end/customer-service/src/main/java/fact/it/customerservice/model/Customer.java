package fact.it.customerservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "customer")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Customer {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String picture;
}
