import requests

gateway_url = "http://localhost:8083/hotels"
num_requests = 1000

for _ in range(num_requests):
    response = requests.get(gateway_url)
    
    # Print the response status
    print(f"Status Code: {response.status_code}")
    