"use strict";
const express = require("express");
const app = express();
const http = require("http");
const  { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",	// adres do frontendu
		methods: ["GET", "POST"]
	}
});

io.on("connection", (socket) => {
	console.log(`User connected: ${socket.id}`);

	socket.on("sendMessage", (data) => {
		console.log(`${socket.id} sent: "${data.text}"`);
		data.sender = "notme6";
		socket.broadcast.emit("receiveMessage", data);
	});
});

server.listen(3001, () => {
	console.log("Server's running");
});

