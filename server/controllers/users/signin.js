/* eslint-disable object-shorthand */
/* eslint-disable key-spacing */
/* eslint-disable no-trailing-spaces */
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../../models/user';

dotenv.config();

const router = express.Router();

router.post('/signin', (req, res) => {
  const user = users.find((s) => s.email === req.body.email);

  // check if user ID exists
  if (!user) {
    res.status(404).json({
      status: 404,
      message: 'User not found',
    });
  // compare the plain password with the hash password  
  } else {
    bcrypt.compare(req.body.password, user.password, (err, matched) => {
      // log user in if password matches
      if (matched) {
        jwt.sign({ user }, process.env.AUTH_KEY, (_err, token) => {
          res.status(200).json({
            status: 200,
            message: `User ${user.first_name} ${user.last_name} is successfully logged in`,
            data: {
              token: token,
            },
          });
        });
      // not authorize user to log in  
      } else {
        res.status(401).json({
          status: 401,
          message: 'Authentication failed, Invalid Email or Password',
        });
      }
    });
  }
});

export default router;
