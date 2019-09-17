/* eslint-disable camelcase */
/* eslint-disable no-trailing-spaces */
/* eslint-disable radix */
import express from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../../middleware/verifyToken';
import users from '../../models/user';

const router = express.Router();

router.get('/users', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (err, loggedUser) => {
    if (err) {
      res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
    // check if the logged user is a user  
    } else if (loggedUser.user.user_type !== 'admin') {
      res.status(403).json({
        status: 403,
        error: 'You are not allowed to access this route',
      });
    } else {
      const all_users = users.filter((c) => c.user_type === 'user');
      const mentees = [];
      all_users.forEach((mentee) => {
        const createMentee = {
          menteeId: mentee.id,
          firstName: mentee.first_name,
          lastName: mentee.last_name,
          email: mentee.email,
          address: mentee.address,
          bio: mentee.bio,
          occupation: mentee.occupation,
          expertise: mentee.expertise,
        };

        mentees.push(createMentee);
      });

      const all_mentors = users.filter((c) => c.user_type === 'mentor');
      const mentors = [];

      all_mentors.forEach((mentor) => {
        const createMentor = {
          menteeId: mentor.id,
          firstName: mentor.first_name,
          lastName: mentor.last_name,
          email: mentor.email,
          address: mentor.address,
          bio: mentor.bio,
          occupation: mentor.occupation,
          expertise: mentor.expertise,
        };

        mentors.push(createMentor);
      });

      res.status(200).json({
        status: 200,
        message: `************** THE SYSTEM HAS ${users.length} USERS **************** |ADMINS DOES NOT COUNT|`,
        mentorsData: {
          information: `Currenty we have ${all_mentors.length} mentors`,
          mentors,
        },
        UsersData: {
          information: `Currenty we have ${all_users.length} Mentees`,
          mentees,
        },
      });
    }
  });
});

export default router;
