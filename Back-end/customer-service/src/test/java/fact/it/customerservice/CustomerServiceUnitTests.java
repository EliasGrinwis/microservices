package fact.it.customerservice;

import fact.it.customerservice.dto.CustomerRequest;
import fact.it.customerservice.dto.CustomerResponse;
import fact.it.customerservice.model.Customer;
import org.junit.jupiter.api.Test;
import fact.it.customerservice.repository.CustomerRepository;
import fact.it.customerservice.service.CustomerService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CustomerServiceUnitTests {

    @InjectMocks
    private CustomerService customerService;

    @Mock
    private CustomerRepository customerRepository;

    @Test
    public void testGetAllCustomers() {
        // Arrange
        List<Customer> mockCustomers = Arrays.asList(
                new Customer("1", "John", "Doe", "john.doe@example.com", "image-url-1"),
                new Customer("2", "Jane", "Doe", "jane.doe@example.com", "image-url-2")
        );
        when(customerRepository.findAll()).thenReturn(mockCustomers);

        // Act
        List<CustomerResponse> result = customerService.getAllCustomers();

        // Assert
        assertEquals(mockCustomers.size(), result.size());
    }

    @Test
    public void testCreateCustomer() {
        // Arrange
        CustomerRequest customerRequest = new CustomerRequest("145", "John", "Doe", "john.doe@example.com", "image-url");
        when(customerRepository.save(any(Customer.class))).thenReturn(new Customer("1", "John", "Doe", "john.doe@example.com", "image-url"));

        // Act
        boolean result = customerService.createCustomer(customerRequest);

        // Assert
        assertTrue(result);
    }
}
