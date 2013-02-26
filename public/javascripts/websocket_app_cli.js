var connection = new WebSocket('ws://192.168.0.9:3000', 'echo-protocol');

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  var message = JSON.parse(e.data);
  $("#chat").append("<p><strong>"+message.user+" </strong>"+message.body.message+"<span class='pull-right'>"+ new Date() +"</span></p>");
};


$(document).ready(function(){
  $("form").on("submit", function(e) {
    e.preventDefault();
    connection.send(JSON.stringify({message: $('#message_input').val()}));
      $("#chat").append("<p><strong>Me </strong>"+$('#message_input').val()+"<span class='pull-right'>"+ new Date() +"</span></p>");
    $('#message_input').val(''); $('#message_input').focus();
    $("#chat").animate({ scrollTop: $(document).height() }, "slow");
  });
});