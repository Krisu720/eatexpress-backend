const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http')
const {Server} = require('socket.io')




//routes
const restaurants = require('./routes/restaurants')
const dishes = require('./routes/dishes')
const sections = require('./routes/sections')
const auth = require('./routes/auth')
const order = require('./routes/order')
const app = express();

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(console.log("Mongo Conectedd..."));
  
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use('/restaurants',restaurants)
app.use('/dishes',dishes)
app.use('/sections',sections)
app.use('/auth',auth)
app.use('/order',order)


server.listen(process.env.PORT || 3001, () => console.log(`Server started... PORT:${process.env.PORT || 3001}`));