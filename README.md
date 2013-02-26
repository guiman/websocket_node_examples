websocket_node_examples
=======================

Just simple websocket + node.js example apps


What to expect
==============

Here you will find three node.js applications with it's clients for the browser. The description should lead you to think
tha this applications will only work on WebSocket ready clients.

Before we start
===============

Run this command on the mail project directory. It will take care of installing all depedencies.

```bash
npm install
```


Running the examples
====================

##Server applications

*app.js: A simple http chat applications useful to demostrate how annoying it would be to chat with http only.

*app_with_webskckets.js: As the counterpart of the app.js, this is the exact same chat application adapted to use WebSockets showing
that this technology is great for realtime apps like a chat.

*simple_example/websockets_server.js: This is just a proof of concept app that accpets connections, receives some data and sends
the same data back to the client.

###For the most basic example

```bash
cd simple_example
node websockets_server.js
```

Then using the the browser of choice open the index.html file and you will start to see how messages start to populate your screen.

###To run the chat application

Just run the chat version you want like:

```bash
node app_with_webskckets.js

or

node app.js
```

Then using the the browser of choice open http://localhost:3000.

NOTE: Check the public/javasripts/websocket_app_cli.js and change the server URL in order to be accesible to others (like people in your LAN).

##Client applications

*simple_example/websockets_cli.js: Creates a connection with the socket and periodically sends a message to the server. Also sets
the common callbacks.

*public/javascripts/websocket_app_cli.js: This is the cliet side of the chat example for Websockets.
