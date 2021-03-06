# WebSocketDemo
This is an simplified web socket application demonstration.

## Background
[Wikipedia](https://en.wikipedia.org/wiki/WebSocket) describe WebSocket as the following:

_"WebSocket providing full-duplex communication channels over a single TCP connection.
WebSocket is a different TCP protocol from HTTP. 
Both protocols are located at layer 7 in the OSI model and, as such, depend on TCP at layer 4. 
Although they are different, RFC 6455 states that WebSocket "is designed to work over HTTP ports 80 and 443 
as well as to support HTTP proxies and intermediaries" thus making it compatible with the HTTP protocol. 
To achieve compatibility, the WebSocket handshake uses the HTTP Upgrade to change from the HTTP protocol 
to the WebSocket protocol."_

WebSocket connection can be established in both insecure (i.e. ws://) and secure (i.e. wss://) way.
In order to establish a secure websocket connection (i.e. wss://), the server is required 
to install certificate from trust source.

In this example, I implement the server in another way:
1. Client (i.e Web browser) make a connection in insecure way(i.e. ws://)
2. Once the connection is established, the Web Browser generated an RSA key pair.
3. The Web Browser sends the RSA public key to the server.
4. The server encrypts an AES key with the RSA public key, and then send back to the browser side.
5. The browser decodes the server response with the RSA private key.
6. And then extract the AES key from the server response.
7. From this point, the communication between server and client in both direction can be encrypted by AES key.

Through this flow, we can establish a secure connection on an insecure channel.

## Server side
The server side program is written in Java.
In this project the following Java library/Framework are used:

1. [Netty network application framework](http://netty.io/) 
2. [Bouncy Castle](https://www.bouncycastle.org/)

## Client Side
The client program is written in Javascript.
In this project the following Javascript library are used:

1. [CryptoJS](https://code.google.com/archive/p/crypto-js/)
2. [jQuery](https://jquery.com/)

The Websocket object using ES6 promise mechanism to make the object easy to use.
