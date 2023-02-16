require("dotenv").config();

const mongoose = require("mongoose");

const connectionStr = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.wa52vud.mongodb.net/ecommerce?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);
mongoose
	.connect(connectionStr)
	.then(() => console.log("Connections Successfully Established"))
	.catch((err) => console.log(err));


mongoose.connection.on("error", (err) => {
    console.log(err);
})