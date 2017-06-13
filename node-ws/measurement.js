const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

//Client connection
wss.on('connection', function connection(ws) {

  console.log('Client connected');

  //Echo client messages
  ws.on('message', function incoming(message) {
    console.log('Received message:' + message);
    ws.send(message);
    console.log('Echoed message: ' + message);
  });

  //Send random measurements to connected client
  var interval = setInterval(function (){
    var weight = Math.floor(Math.random() * 45);
    var timeStamp = new Date().toISOString();
    var measurementData = JSON.stringify({ weight: weight, timeStamp: timeStamp });
    ws.send(measurementData); //Send should also have error handling
    console.log('Sent measurement: ' + measurementData);
  }, 1000);

  //Stop sending after client disconnects
  ws.on('close', function (){
    clearInterval(interval);
    console.log('Client disconnected');
  });

  //Connection failed
  ws.on('error', function (){
      clearInterval(interval);
      console.log('Connection error');
  });

});

//Server ready
wss.on('listening', function listening() {
  console.log('Listening on port 8080');
});
