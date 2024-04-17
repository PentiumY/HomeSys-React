import asyncio
import json

# Server configuration
SERVER_HOST = '127.0.0.1'
SERVER_PORT = 8011

async def run_client():
    while True:
        try:
            reader, writer = await asyncio.open_connection(SERVER_HOST, SERVER_PORT)
            print(f"Connected to {SERVER_HOST}:{SERVER_PORT}")

            while True:
                data = await reader.readline()
                if not data:
                    print("No data received from server.")
                    break

                # Convert received JSON data to dictionary
                try:
                    json_data = json.loads(data.decode().strip())
                except json.JSONDecodeError:
                    print("Received invalid JSON data from server.")
                    continue

                print(f"Received from server: {json.dumps(json_data, indent=4)}")
                
        except ConnectionRefusedError:
            print("Connection refused.")
            
        except ConnectionResetError:
            print("Connection reset by peer.")

if __name__ == "__main__":
    asyncio.run(run_client())
