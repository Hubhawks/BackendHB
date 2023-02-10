const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const axios = require('axios');
const path = require('path');
const express = require('express');
 
const nodemailer = require('nodemailer');
// const app = express();
const cors = require('cors');
const { response } = require("express");
router.use(cors())
const buildPath = path.join(__dirname, '..', 'build');
router.use(express.json());
router.use(express.static(buildPath)); 
 
router.post('/BookReviews',async(req,res)=>{
	
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	const userData = await User.findById(req.body.user._id);
	console.log(userData, 'BookReviews');

	let mailOptions = {
		from: `${req.body.email}`,
		to: 'simran@hubhawks.com',
		subject: `Message from author:- Dashboard`,
		html: `Email- ${userData.email}<br><strong> Name </strong> ${userData.Name}<strong><br>Choose the preferred platform</strong><br>${req.body.platform}<br><strong>How many reviews would you like to have?</strong><br>${req.body.reviews}<strong><br>Drop your amazon book link</strong><br>${req.body.link}<br>
		<br><strong>Additional comments (Optional)</strong><br>${req.body.Comments}`,
	  };
 
	
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
});
router.post('/BookReviewsG',(req,res)=>{
	
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'hhh');

	let mailOptions = {
		from: `${req.body.email}`,
		to: 'rajiv@hubhawks.com',
		subject: `Message from author:- Dashboard`,
		html: `<strong>${req.body.user1.email}<br>Choose the preferred platform</strong><br>${req.body.platform}<br><strong>How many reviews would you like to have?</strong><br>${req.body.reviews}<strong><br>Drop your amazon book link</strong><br>${req.body.link}<br>
		<br><strong>Additional comments (Optional)</strong><br>${req.body.Comments}`,
	  };
 
	
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
	});
	const secondEmailOptions = {
		from: 'your_email@gmail.com',
		to: `${req.body.user1.email}`,
		subject: 'Thanks for Ordering',
		html: `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Order placed</title>
			<style>
		
		
		.ab {
		  background-image: url(https://drive.google.com/uc?export=view&id=1XD9BM3-J3wosCLhg_BUoMS7d7SpEbYps);
		  background-repeat:no-repeat;
		 width:885px;
		  height:250px;
		  background-position: center;
		  display: flex;
			justify-content: center;
			align-items: center;
			margin: auto;
		}
		
		
		  
		  
		</style>
		</head>
		<body class="a">
		<div class="ab">
		  <div style="background-color:white">
			<p>Thank you, Name !</p>
			<p>We’ve got your order.</p>
			
		  </div>
		  
		</div>
		<p style="text-align: center">Hey there! Your order 12dr4 is confirmed. We will keep you updated with the progress or you can check it <a href="link" > here </a>.</p>
		<h2 style="text-align: center">Order Details</h2>
		<p style="text-align: center">Your order is confirmed for editing.</p>
		</body>
		</html>`
	  };
	  
	  transporter.sendMail(secondEmailOptions, (error, info) => {
		if (error) {
		  console.log(error);
		} else {
		  console.log('Second email sent: ' + info.response);
		}
	  });
});















router.post('/editing', async (req, res) => {
	axios.get("https://testing-qmht.onrender.com/api/users/").then(response => {
		const data=response.data
	console.log(data,'send')
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'hhh');
	
	let mailOptions = {
		from: `${req.body.weather}`,
		to: 'rajiv@hubhawks.com',
		subject: `Message from author:-${data} Dashboard`,
		html: `<strong>What type of editing are you looking for?</strong><br> ${req.body.EditingType}<br> <strong>Which three words describe your book?</strong><br>  ${req.body.words1}<br>${req.body.words2}<br>${req.body.words3}<br>${req.body.words4}<br>${req.body.words5}<br>${req.body.words6}<br>${req.body.words7}<br>${req.body.words8}<br>${req.body.words9}<br>${req.body.words10}<br>${req.body.words11}<br>${req.body.words12}<br>${req.body.words13}<br>${req.body.words14}<br>${req.body.words15}
		<br><strong>How many words are there in your book?<strong><br>${req.body.Wordsbook}<br><strong>Additional comments (Optional)</strong><br>${req.body.Comments}</strong><br>${req.body.Timeline}<strong>What is your approximate advertising budget?</strong><br>`,
	  };
 
    
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
	});
})
});
router.post('/coverdesign',async(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'hhh');
	const userData = await User.findById(req.body.user._id);
	console.log(userData, 'AmazonAds');
	let mailOptions = {
		from: `${req.body.weather}`,
		to: 'simran@hubhawks.com',
		subject: `Message from author:- Dashboard`,
		html: ` Email- ${userData.email}<br><strong> Name </strong> ${userData.Name}<strong>Which three words describe your book?</strong><br>  ${req.body.words1}<br>${req.body.words2}<br>${req.body.words3}<br>${req.body.words4}<br>${req.body.words5}<br>${req.body.words6}<br>${req.body.words7}<br>${req.body.words8}<br>${req.body.words9}<br>${req.body.words10}<br>${req.body.words11}<br>${req.body.words12}<br>${req.body.words13}<br>${req.body.words14}<br>${req.body.words15}
		<strong>What visual representation suits your story? (Choose any 3)</strong><br>${req.body.story}<strong><br>What is the “Title of the Story”?</strong><br> ${req.body.title}<br><strong> What is the summary of the Story?</strong><br>${req.body.Summary}<br><strong> What is the expected timeline?</strong><br>${req.body.timeline}<br><strong>Additional comments (Optional)</strong><br>${req.body.Comments}`,
	  };   
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
	});
	const secondEmailOptions = {
		from: 'your_email@gmail.com',
		to: `${userData.email}`,
		subject: 'Thanks for Ordering',
		html: `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Order placed</title>
			<style>
		
		
		.ab {
		  background-image: url(https://drive.google.com/uc?export=view&id=1XD9BM3-J3wosCLhg_BUoMS7d7SpEbYps);
		  background-repeat:no-repeat;
		 width:885px;
		  height:250px;
		  background-position: center;
		  display: flex;
			justify-content: center;
			align-items: center;
			margin: auto;
		}
		
		
		  
		  
		</style>
		</head>
		<body class="a">
		<div class="ab">
		  <div style="background-color:white">
			<p>Thank you, Name !</p>
			<p>We’ve got your order.</p>
			
		  </div>
		  
		</div>
		<p style="text-align: center">Hey there! Your order 12dr4 is confirmed. We will keep you updated with the progress or you can check it <a href="link" > here </a>.</p>
		<h2 style="text-align: center">Order Details</h2>
		<p style="text-align: center">Your order is confirmed for editing.</p>
		</body>
		</html>`
	  };
	  
	  transporter.sendMail(secondEmailOptions, (error, info) => {
		if (error) {
		  console.log(error);
		} else {
		  console.log('Second email sent: ' + info.response);
		}
	  });
});
router.post('/coverdesignG',async(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'hhh');
	
	let mailOptions = {
		from: `${req.body.weather}`,
		to: 'simran@hubhawks.com',
		subject: `Message from author:- Dashboard`,
		html: ` <strong>Which three words describe your book?</strong><br>  ${req.body.words1}<br>${req.body.words2}<br>${req.body.words3}<br>${req.body.words4}<br>${req.body.words5}<br>${req.body.words6}<br>${req.body.words7}<br>${req.body.words8}<br>${req.body.words9}<br>${req.body.words10}<br>${req.body.words11}<br>${req.body.words12}<br>${req.body.words13}<br>${req.body.words14}<br>${req.body.words15}
		<strong>What visual representation suits your story? (Choose any 3)</strong><br>${req.body.story}<strong><br>What is the “Title of the Story”?</strong><br> ${req.body.title}<br><strong> What is the summary of the Story?</strong><br>${req.body.Summary}<br><strong> What is the expected timeline?</strong><br>${req.body.timeline}<br><strong>Additional comments (Optional)</strong><br>${req.body.Comments}`,
	  };
 
    
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
	});
	const secondEmailOptions = {
		from: 'your_email@gmail.com',
		to: `${req.body.user1.email}`,
		subject: 'Thanks for Ordering',
		html: `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Order placed</title>
			<style>
		
		
		.ab {
		  background-image: url(https://drive.google.com/uc?export=view&id=1XD9BM3-J3wosCLhg_BUoMS7d7SpEbYps);
		  background-repeat:no-repeat;
		 width:885px;
		  height:250px;
		  background-position: center;
		  display: flex;
			justify-content: center;
			align-items: center;
			margin: auto;
		}
		
		
		  
		  
		</style>
		</head>
		<body class="a">
		<div class="ab">
		  <div style="background-color:white">
			<p>Thank you, Name !</p>
			<p>We’ve got your order.</p>
			
		  </div>
		  
		</div>
		<p style="text-align: center">Hey there! Your order 12dr4 is confirmed. We will keep you updated with the progress or you can check it <a href="link" > here </a>.</p>
		<h2 style="text-align: center">Order Details</h2>
		<p style="text-align: center">Your order is confirmed for editing.</p>
		</body>
		</html>`
	  };
	  
	  transporter.sendMail(secondEmailOptions, (error, info) => {
		if (error) {
		  console.log(error);
		} else {
		  console.log('Second email sent: ' + info.response);
		}
	  });
	
});
router.post('/translation',(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'hhh');
	
	let mailOptions = {
		from: `${req.body.weather}`,
		to: 'simran@hubhawks.com',
		subject: `Message from author:- Dashboard`,
		html: `<strong><br>What language is  your content in?</strong><br>${req.body.content}<strong><br>What language do you want to get the translation in?</strong><br>${req.body.GetLanguage[0]}<br/>${req.body.GetLanguage[1]}<br/>${req.body.GetLanguage[2]}<br/>${req.body.GetLanguage[3]}<br/>${req.body.GetLanguage[4]}<br/>${req.body.GetLanguage[5]}<br/>${req.body.GetLanguage[6]}<strong><br>What is the genre of your book?${req.body.genre[0]}<br/>${req.body.genre[1]}<br/>${req.body.genre[2]}${req.body.genre[3]}<br/>${req.body.genre[4]}<br/>${req.body.genre[5]}<br/>${req.body.genre[6]}<br/>${req.body.genre[7]}<br/>${req.body.genre[8]}<br/>${req.body.genre[9]}<br/>${req.body.genre[10]}<br/>${req.body.genre[11]}<br/>${req.body.genre[12]}<br/>${req.body.genre[13]}<br><strong><br>What is the word count of your book?</strong><br>${req.body.count}<br> <strong><br>Additional comments (Optional)</strong><br>${req.body.Comments}<strong><br>What kind of translation do you want?</strong><br>${req.body.translation} `,
	  };
 
    
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
});


router.post('/translationG',(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'hhh');
	
	let mailOptions = {
		from: `${req.body.weather}`,
		to: 'simran@hubhawks.com',
		subject: `Message from author:- Dashboard`,
		html: `<strong><br>What language is  your content in?</strong><br>${req.body.content}<strong><br>What language do you want to get the translation in?</strong><br>${req.body.GetLanguage[0]}<br/>${req.body.GetLanguage[1]}<br/>${req.body.GetLanguage[2]}<br/>${req.body.GetLanguage[3]}<br/>${req.body.GetLanguage[4]}<br/>${req.body.GetLanguage[5]}<br/>${req.body.GetLanguage[6]}<strong><br>What is the genre of your book?${req.body.genre[0]}<br/>${req.body.genre[1]}<br/>${req.body.genre[2]}${req.body.genre[3]}<br/>${req.body.genre[4]}<br/>${req.body.genre[5]}<br/>${req.body.genre[6]}<br/>${req.body.genre[7]}<br/>${req.body.genre[8]}<br/>${req.body.genre[9]}<br/>${req.body.genre[10]}<br/>${req.body.genre[11]}<br/>${req.body.genre[12]}<br/>${req.body.genre[13]}<br><strong><br>What is the word count of your book?</strong><br>${req.body.count}<br> <strong><br>Additional comments (Optional)</strong><br>${req.body.Comments}<strong><br>What kind of translation do you want?</strong><br>${req.body.translation} `,
	  };
 
    
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
	});
	const secondEmailOptions = {
		from: 'your_email@gmail.com',
		to: `${req.body.user1.email}`,
		subject: 'Thanks for Ordering',
		html: `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Order placed</title>
			<style>
		
		
		.ab {
		  background-image: url(https://drive.google.com/uc?export=view&id=1XD9BM3-J3wosCLhg_BUoMS7d7SpEbYps);
		  background-repeat:no-repeat;
		 width:885px;
		  height:250px;
		  background-position: center;
		  display: flex;
			justify-content: center;
			align-items: center;
			margin: auto;
		}
		
		
		  
		  
		</style>
		</head>
		<body class="a">
		<div class="ab">
		  <div style="background-color:white">
			<p>Thank you, Name !</p>
			<p>We’ve got your order.</p>
			
		  </div>
		  
		</div>
		<p style="text-align: center">Hey there! Your order 12dr4 is confirmed. We will keep you updated with the progress or you can check it <a href="link" > here </a>.</p>
		<h2 style="text-align: center">Order Details</h2>
		<p style="text-align: center">Your order is confirmed for editing.</p>
		</body>
		</html>`
	  };
	  
	  transporter.sendMail(secondEmailOptions, (error, info) => {
		if (error) {
		  console.log(error);
		} else {
		  console.log('Second email sent: ' + info.response);
		}
	  });
});

router.post('/activateD',(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'h');
	
	let mailOptions = {
		from: `${req.body.weather}`,
		to: 'rajiv@hubhawks.com',
		subject: `Activate Discount for Him`,
		html: `<strong><br>Activate Discount for this email${req.body.count} `,
	  };
 
    
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
});
router.post('/partnerus',(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'h');
	
	let mailOptions = {
		from: `${req.body.weather}`,
		to: 'rajiv@hubhawks.com',
		subject: `Thanks for Joining as Freelancer`,
		html: `<strong><br>Thanks for Joining as Freelancer `,
	  };
 
    
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
});
router.post('/thanku', (req, res) => {
	const { email, name } = req.body;
  
	// Use nodemailer to send the email
	let transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
			 user: 'rajivkhanduja2@gmail.com',
			 pass: 'ptvmjxwhiusgozxa'
		 }
	 });
	const mailOptions = {
	  from: 'rajiv@hubhawks.com', // sender address
	  to: email, // list of receivers
	  subject: 'Welcome to our application', // Subject line
	  html: `<p>Welcome to our application, ${name}!</p>`// plain text body
	};
  
	transporter.sendMail(mailOptions, (err, info) => {
	  if(err)
		console.log(err)
	  else
		console.log(info);
   });
	res.send('Email sent successfully')
  });
  
router.post('/ghostwriting',(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'hhh');
	
	let mailOptions = {
		from: `${req.body.weather}`,
		to: 'rajiv@hubhawks.com',
		subject: `Message from author:- Dashboard`,
		html: `Email- ${userData.email}<br><strong> Name </strong> ${userData.Name}
		<strong>What is the author’s background?</strong><br>${req.body.authorbackground} <strong>Which three words describe your book?</strong><br>  ${req.body.words1}<br>${req.body.words2}<br>${req.body.words3}<br>${req.body.words4}<br>${req.body.words5}<br>${req.body.words6}<br>${req.body.words7}<br>${req.body.words8}<br>${req.body.words9}<br>${req.body.words10}<br>${req.body.words11}<br>${req.body.words12}<br>${req.body.words13}<br>${req.body.words14}<br>${req.body.words15}
		<strong>Get a Quote</strong><br>${req.body.Quote}<strong>Additional comments (Optional)</strong><br>${req.body.Comments}`,
	  };
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
});

router.post('/ghostwritingG',(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'hhh');
	
	let mailOptions = {
		from: `${req.body.weather}`,
		to: 'simrantandon2801@gmail.com',
		subject: `Message from author:- Dashboard`,
		html: `<strong>What is the author’s background?</strong><br>${req.body.authorbackground} <strong>Which three words describe your book?</strong><br>  ${req.body.words1}<br>${req.body.words2}<br>${req.body.words3}<br>${req.body.words4}<br>${req.body.words5}<br>${req.body.words6}<br>${req.body.words7}<br>${req.body.words8}<br>${req.body.words9}<br>${req.body.words10}<br>${req.body.words11}<br>${req.body.words12}<br>${req.body.words13}<br>${req.body.words14}<br>${req.body.words15}
		<strong>Get a Quote</strong><br>${req.body.Quote}<strong>Additional comments (Optional)</strong><br>${req.body.Comments}`,
	  };
 
    
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
});
router.post('/amazonAds', async (req, res) => {
	const {user}=req.body
	
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'hhh');
	const userData = await User.findById(req.body.user._id);
	console.log(userData, 'AmazonAds');
	let mailOptions = {
		from: `${req.body.weather}`,
		to: 'rajiv@hubhawks.com',
		subject: `Message from author:- Dashboard`,
		html: ` Email- ${userData.email}<br><strong> Name </strong> ${userData.Name}
		<strong><br>Which three words describe your book?</strong><br>${req.body.words1}<br>${req.body.words2}<br>${req.body.words3}<br>${req.body.words4}<br>${req.body.words5}<br>${req.body.words6}<br>${req.body.words7}<br>${req.body.words8}<br>${req.body.words9}<br>${req.body.words10}<br>${req.body.words11}<br>${req.body.words12}<br>${req.body.words13}<br>${req.body.words14}<br>${req.body.words15}
		<br><strong>Do you want your own dashboard?</strong><br>${req.body.dashboard}${req.body.userData}<strong><br>What are you looking for ?</strong><br>${req.body.look}<strong><br>What is your approximate advertising budget?</strong><br>${req.body.budget}<strong><br>Additional comments (Optional)</strong><br>${req.body.Comments} ${req.body.user._id}`,
	};
	
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
	});
	const secondEmailOptions = {
		from: 'your_email@gmail.com',
		to: `${userData.email}`,
		subject: 'Thanks for Ordering',
		html: `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Order placed</title>
			<style>
		
		
		.ab {
		  background-image: url(https://drive.google.com/uc?export=view&id=1XD9BM3-J3wosCLhg_BUoMS7d7SpEbYps);
		  background-repeat:no-repeat;
		 width:885px;
		  height:250px;
		  background-position: center;
		  display: flex;
			justify-content: center;
			align-items: center;
			margin: auto;
		}
		
		
		  
		  
		</style>
		</head>
		<body class="a">
		<div class="ab">
		  <div style="background-color:white">
			<p>Thank you, Name !</p>
			<p>We’ve got your order.</p>
			
		  </div>
		  
		</div>
		<p style="text-align: center">Hey there! Your order 12dr4 is confirmed. We will keep you updated with the progress or you can check it <a href="link" > here </a>.</p>
		<h2 style="text-align: center">Order Details</h2>
		<p style="text-align: center">Your order is confirmed for editing.</p>
		</body>
		</html>`
	  };
	  
	  transporter.sendMail(secondEmailOptions, (error, info) => {
		if (error) {
		  console.log(error);
		} else {
		  console.log('Second email sent: ' + info.response);
		}
	  });
	

});
router.post('/amazonAdsg', async (req, res) => {
	const {user}=req.body
	
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'hhh');
	
	
	let mailOptions = {
		from: `${req.body.weather}`,
		to: 'rajiv@hubhawks.com',
		subject: `Message from author:- Dashboard`,
		html: ` Email- <br>${req.body.user1.email}<strong> Name </strong> 
		<strong><br>Which three words describe your book?</strong><br>${req.body.words1}<br>${req.body.words2}<br>${req.body.words3}<br>${req.body.words4}<br>${req.body.words5}<br>${req.body.words6}<br>${req.body.words7}<br>${req.body.words8}<br>${req.body.words9}<br>${req.body.words10}<br>${req.body.words11}<br>${req.body.words12}<br>${req.body.words13}<br>${req.body.words14}<br>${req.body.words15}
		<br><strong>Do you want your own dashboard?</strong><br>${req.body.dashboard}<strong><br>What are you looking for ?</strong><br>${req.body.look}<strong><br>What is your approximate advertising budget?</strong><br>${req.body.budget}<strong><br>Additional comments (Optional)</strong><br>${req.body.Comments} `,
	};
	
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
	});
	const secondEmailOptions = {
		from: 'your_email@gmail.com',
		to: `${req.body.user1.email}`,
		subject: 'Thanks for Ordering',
		html: `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Order placed</title>
			<style>
		
		
		.ab {
		  background-image: url(https://drive.google.com/uc?export=view&id=1XD9BM3-J3wosCLhg_BUoMS7d7SpEbYps);
		  background-repeat:no-repeat;
		 width:885px;
		  height:250px;
		  background-position: center;
		  display: flex;
			justify-content: center;
			align-items: center;
			margin: auto;
		}
		
		
		  
		  
		</style>
		</head>
		<body class="a">
		<div class="ab">
		  <div style="background-color:white">
			<p>Thank you, Name !</p>
			<p>We’ve got your order.</p>
			
		  </div>
		  
		</div>
		<p style="text-align: center">Hey there! Your order 12dr4 is confirmed. We will keep you updated with the progress or you can check it <a href="link" > here </a>.</p>
		<h2 style="text-align: center">Order Details</h2>
		<p style="text-align: center">Your order is confirmed for editing.</p>
		</body>
		</html>`
	  };
	  
	  transporter.sendMail(secondEmailOptions, (error, info) => {
		if (error) {
		  console.log(error);
		} else {
		  console.log('Second email sent: ' + info.response);
		}
	  });

});


router.post('/booktrailer',(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'hhh');
	
	let mailOptions = {
		from: `${req.body.weather}`,
		to: 'simran@hubhawks.com',
		subject: `Message from author:- Dashboard`,
		html: `<strong><br>Describe your book’s storyline?</strong><br>${req.body.storyline}<strong><br>What kind of trailer do you want?</strong><br>${req.body.trailor}<strong><br>What is the expected timeline?</strong><br>${req.body.timeline}<br><strong>Additional comments (Optional)</strong><br>${req.body.Comments}`,
	  };
 
    
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
});
router.post('/bookstore',(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajivkhanduja2@gmail.com',
          pass: 'ptvmjxwhiusgozxa'
        }
	});
	transporter.verify((err, success) => {
		err
		  ? console.log(err)
		  : console.log(`=== Server is ready to take messages: ${success} ===`);
	});
	console.log(req.body, 'hhh');
	
	let mailOptions = {
		from: `${req.body.weather}`,
		to: 'simran@hubhawks.com',
		subject: `Message from author:- Dashboard`,
		html: `<strong>Which is your preferred book store?</strong><br>${req.body.bookStore}<strong> <br> Who is the publisher of your book?</strong><br>${req.body.publisher}<br> <strong>How many stores would you like to get your book placed at?</strong><br>${req.body.bookplaced}<br> <strong> What kind of promos are you looking for?<br> </strong><br>${req.body.promos}<br> <strong>Get a Quote</strong><br>${req.body.Quote} 
		<br> <strong>Additional comments (Optional)</strong><br>${req.body.Comments} `,
	  };
 
    
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
});


module.exports = router;