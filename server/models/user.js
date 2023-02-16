const mongoose = require("mongoose");
const bycript = require("bcrypt");

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "is required"],
		},
		email: {
			type: String,
			required: [true, "is required"],
			unique: true,
			index: true,
			validate: {
				validator: function (v) {
					return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v);
				},
				message: (props) => `${props.value} is not a valid email address`,
			},
		},
		password: {
			type: String,
			required: [true, "is required"],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		cart: {
			type: Object,
			default: {
				total: 0,
				count: 0,
			},
		},
		notification: {
			type: Array,
			default: [],
		},
		orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
	},
	{ minimize: false }
);

UserSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) throw new Error("Invalid Credentials");
	const isMatch = bycript.compareSync(password, user.password);
	if (isMatch) return user;
	throw new Error("Invalid Credentials");
};

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	return userObject;
};

UserSchema.pre("save", async function (next) {
    const user = this;
    
    if (!user.isModified("password")) return next();
    
	bycript.genSalt(10, (err, salt) => {
		if (err) return next(err);

		bycript.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            
			user.password = hash;
			next();
		});
	});
});

UserSchema.pre("remove", async function (next) {
    this.model("Order").remove({ owner: this._id }, next);
    
    
})


const User = mongoose.model("User", UserSchema);
module.exports = User;
