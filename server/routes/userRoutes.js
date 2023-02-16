const router = require("express").Router();
const User = require("../models/user");

// Sign up
router.post("/signup", async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const userPresent = await User.findOne({ email });
		if (userPresent) return res.status(400).send("Email already exists");

		const user = await User.create({
			name,
			email,
			password,
		});
		res.json(user);
	} catch (error) {
		if (error.code === 11000) return res.status(400).send("Email already exists.....");
		res.status(400).send(error.message);
	}
});

// Log in
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findByCredentials(email, password);
		res.json(user);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Get Users
router.post("/", async (req, res) => {
	try {
		const user = await User.find({ isAdmin: false }).populate("orders");
		res.json(user);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;
