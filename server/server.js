const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
require("./connection");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
	cors: "*",
	methods: "*",
});

const User = require("./models/user");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRouters");
const imageRoute = require("./routes/imageRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/images", imageRoute);

server.listen(8080, () => {
	console.log("Server is running on port 8080");
});
