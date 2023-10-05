package fact.it.customerservice.service;

import fact.it.customerservice.dto.CustomerResponse;
import fact.it.customerservice.model.Customer;
import fact.it.customerservice.repository.CustomerRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    @PostConstruct
    public void loadData() throws ParseException {
        if(customerRepository.count() <= 0){
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            Date date = dateFormat.parse("29/07/2003");

            Customer customer = Customer.builder()
                    .skuCode("tube6in")
                    .firstName("Elias")
                    .lastName("Grinwis Plaat Stultjes")
                    .dateOfBirth(date)
                    .build();

            customerRepository.save(customer);
        }
    }

    public List<CustomerResponse> getAllCustomers() {
        List<Customer> customerList = customerRepository.findAll();

        return customerList.stream().map(this::mapToCustomerResponse).toList();
    }

    private CustomerResponse mapToCustomerResponse(Customer customer) {
        return CustomerResponse.builder()
                .id(customer.getId())
                .skuCode(customer.getSkuCode())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .dateOfBirth(customer.getDateOfBirth())
                .build();
    }
}
