const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();

		res.status(201).send({ message: "User created successfully" });	
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
const getUser = (userId) => {
	User.findById(userId, (err, user) => {
	  if (err) return console.error(err);
	  if (!user) return console.log('User not found');
	  console.log(user);
	});
};


router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		
	  if (err) return res.status(500).send(err);
	  if (!user) return res.status(404).send({ message: 'User not found' });
	  res.send(user);
	});
  });



router.get('/users', (req, res) => {
	const userId = req.session.userId;
	User.find(userId,(err, users) => {
	  if (err) return res.json({ success: false, error: err });
	  console.log(getUser('63b4014a3e903cd60408bfad'));
		return res.json({ userId });
	
	});
});
router.post("/forgotpassword", (req, res) => {
	const email = req.body.email;
	const otp = Math.floor(100000 + Math.random() * 900000);
  
	MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
		User.findOne({ email: email }, (err, user) => {
			if (user.otp === otp) {
			  User.updateOne(
				{ _id: ObjectId(user._id) },
				{ $set: { password: password } },
				(err, result) => {
				  if (err) {
					console.log(err);
					res.status(500).send("Something went wrong.");
				  } else {
					console.log("Password updated.");
					res.status(200).send("Password updated.");
				  }
				}
			  );
			} else {
			  res.status(401).send("OTP is incorrect.");
			}
		  });
  
	  User.findOne({ email: email }, (err, user) => {
		if (user) {
		  const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
			  user: "rajivkhanduja2@gmail.com",
			  pass: "ptvmjxwhiusgozxa",
			},
		  });
  
		  const mailOptions = {
			from: "rajivkhanduja2@gmail.com",
			to: email,
			subject: "Password Reset OTP",
			text: `Your OTP is: ${otp}`,
		  };
  
		  transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
			  console.log(err);
			  res.status(500).send("Something went wrong.");
			} else {
			  console.log("Email sent: " + info.response);
			  res.status(200).send("OTP sent to email.");
			}
		  });
		} else {
		  res.status(404).send("Email not found.");
		}
	  });
	});
  });

module.exports = router;
