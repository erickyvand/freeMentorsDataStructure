/* eslint-disable no-trailing-spaces */
/* eslint-disable radix */
import express from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../../middleware/verifyToken';
import sessions from '../../models/session';

const router = express.Router();

router.get('/sessions', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (err, loggedUser) => {
    if (err) {
      res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
    // check if the logged user is a user  
    } else if (loggedUser.user.user_type === 'user') {
      const menteeData = sessions.filter((c) => c.menteeId === loggedUser.user.id);

      res.status(200).json({
        status: 200,
        menteeData,
      });
    } else if (loggedUser.user.user_type === 'mentor') {
      const mentorData = sessions.filter((c) => c.mentorId === loggedUser.user.id);
      res.status(200).json({
        status: 200,
        mentorData,
      });
    } else {
      res.status(403).json({
        status: 403,
        error: 'Sorry no informatin for you for this route',
      });
    }
  });
});

export default router;
