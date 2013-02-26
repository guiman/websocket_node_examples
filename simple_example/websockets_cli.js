var connection = new WebSocket('ws://localhost:8080', 'echo-protocol');

// When the connection is open, send some data to the server
connection.onopen = function () {
  setInterval(function(){connection.send('Ping')}, 2000);
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  var new_div = document.createElement('p');
  new_div.innerHTML = 'Server: ' + e.data + ' ' + new Date();
  document.getElementById("body").appendChild(new_div);
};