```
server is listening on port 8080 
data from client: <Buffer 68 65 79>
```

# WebSocket Server Log

### Server Status
- **Message**: Server is listening on port 8080
- **Explanation**: The WebSocket server is up and running, waiting for incoming connections from clients on port 8080.

### Data Received from Client
- **Raw Data**: `<Buffer 68 65 79>`
- **Explanation**: This is the raw binary data (buffer) received from the client in hexadecimal format.
  
  When converted to ASCII:
  - `68` → `h`
  - `65` → `e`
  - `79` → `y`

  **Decoded Message**: `"hey"`

### Summary
- The WebSocket server received the message `"hey"` from the client, which was represented in a raw buffer (`<Buffer 68 65 79>`).
