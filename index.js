var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
  res.sendfile("./public/index.html");
});

app.get("/vendor/jquery.js", function(req, res){
  res.sendfile("./public/vendor/jquery.js");
});

io.on("connection", function(socket){
  socket.on("message", function(msg){
    io.emit("message", (msg));
  });

  socket.on("vote", function(id){
    io.emit("vote", (id));
  });
});

http.listen(3000, function(){
  console.log("listening on *:3000");
});