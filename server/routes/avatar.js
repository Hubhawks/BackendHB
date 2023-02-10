const Canvas = require('canvas');
const express = require('express');
const mongoose = require('mongoose');
const { User } = require("../models/user");

const router = require("express").Router();
router.get('/signin', (req, res) => {
  const canvas = Canvas.createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  // set the background color
  ctx.fillStyle = '#00FF00';
  ctx.fillRect(0, 0, 200, 200);

  // set the text color
  ctx.fillStyle = '#000000';
  ctx.font = '30px Impact';
  ctx.textAlign = 'center';
  ctx.fillText(req.body.name.substring(0, 1), 100, 100);
  User.save((err) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      res.send({
        message: 'User created successfully'
      });
    }
  });
});
module.exports = router;