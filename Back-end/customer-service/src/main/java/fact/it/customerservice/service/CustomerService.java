package fact.it.customerservice.service;

import fact.it.customerservice.dto.CustomerRequest;
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
    public void loadData() {
        if(customerRepository.count() <= 0){
            Customer customer = Customer.builder()
                    .firstName("Elias")
                    .lastName("Grinwis")
                    .email("eliasgrinwis27@gmail.com")
                    .picture("https://lh3.googleusercontent.com/a/ACg8ocIlPSSdKXQzxGcuj0SFqmx3f2AA4zalQ6FzFe-ouSnyHLk=s96-c")
                    .build();

            customerRepository.save(customer);
        }
    }

    public List<CustomerResponse> getAllCustomers() {
        List<Customer> customerList = customerRepository.findAll();

        return customerList.stream().map(this::mapToCustomerResponse).toList();
    }

    public boolean createCustomer(CustomerRequest customerRequest) {
        Customer customer = new Customer();

        customer.setFirstName(customerRequest.getFirstName());
        customer.setLastName(customerRequest.getLastName());
        customer.setEmail(customerRequest.getEmail());
        customer.setPicture(customerRequest.getPicture());

        return true;
    }

    private CustomerResponse mapToCustomerResponse(Customer customer) {
        return CustomerResponse.builder()
                .id(customer.getId())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmail())
                .picture(customer.getPicture())
                .build();
    }
}
