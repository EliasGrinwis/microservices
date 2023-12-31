import asyncio
import aiohttp

gateway_url = "https://api-gateway-eliasgrinwis.cloud.okteto.net/hotels"
num_requests = 1000

async def send_request(session, url):
 async with session.get(url) as response:
     return response.status

async def main():
 async with aiohttp.ClientSession() as session:
     for _ in range(num_requests):
         status = await send_request(session, gateway_url)
         print(f"Status: {status}")

asyncio.run(main())
