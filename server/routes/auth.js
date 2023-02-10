const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passport = require("passport");
const CLIENT_URL = "http://localhost:3000/editing";
const CLIENT_UL = "http://localhost:3000";

router.get("/login/success", (req, res) => {
	if (req.user) {
	  res.status(200).json({
		success: true,
		message: "successfull",
		user: req.user,
		message: "user has successfully authenticated",
      cookies: req.cookies
	  });
	}
});
router.get("/login/failed", (req, res) => {
	res.status(401).json({
	  success: false,
	  message: "failure",
	});
  });
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(CLIENT_UL);
  });
  
router.get("/google", passport.authenticate("google", { scope: ["profile",'email'] }));
  
router.get(
	"/google/callback",
	passport.authenticate("google", {
	  successRedirect: 'http://localhost:3000/explore',
		failureRedirect: "/login/failed",
		function(req, res) {
			// generate a token and send it to the client
			const token = jwt.sign({ user: req.user }, 'secret', { expiresIn: '8d' });
			
		  }
	})
  );
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });
		const token = user.generateAuthToken();
		
		res.status(200).send({ data: token, message: "logged in successfully" }
		);
		
		console.log(res);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};
router.get('/user', (req, res) => {
    // Get token from request headers
    const token = req.headers['x-access-token'];

    // Verify token
    jwt.verify(token, '785855', async (err, decoded) => {
        if (err) {
            res.json({ user: null });
        } else {
            // Find user by ID
			const user = await User.findById(decoded.id);
			console.log(user,'lslsll')
            res.json({ user });
        }
    });
});
module.exports = router;
