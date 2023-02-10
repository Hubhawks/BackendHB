require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const authRoute = require("./routes/auth");
const email = require("./routes/email")
const avatar =require('./routes/avatar')
const passportSetup = require("./passport");
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const passport = require("passport");
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(
	cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// const corsConfig = {
//     credentials: true,
//     origin: true,
// };
// app.use(cors(corsConfig));
// app.use(function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', req.header('origin') );
// 	next();
//   });
//   app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "https://localhost:3000");
// 	res.header("Access-Control-Allow-Credentials", true);
// 	next();
//   });
const corsOptions ={
	origin:'*', 
	credentials:true,            //access-control-allow-credentials:true
	optionSuccessStatus:200,
}
app.use(
	cors({
		         
	    optionSuccessStatus:200,
	  origin: "http://localhost:3000",
	  methods: "GET,POST,PUT,DELETE",
	  credentials: true,
	})
  );
  app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors(corsOptions));
// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/email", email);
app.use("/api/avatar", avatar);
const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
