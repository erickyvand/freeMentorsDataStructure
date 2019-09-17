/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable no-trailing-spaces */
/* eslint-disable radix */
import express from 'express';
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import verifyToken from '../../middleware/verifyToken';
import sessions from '../../models/session';
import reviews from '../../models/review';

const router = express.Router();

router.post('/sessions/:id/review', verifyToken, (req, res) => {
  const findSession = sessions.find((c) => c.sessionId === parseInt(req.params.id));

  // Validate inputs.
  const schema = {
    score: Joi.number().required(),
    remark: Joi.string().min(3).max(250).required(),
  };

  const result = Joi.validate(req.body, schema);

  jwt.verify(req.token, process.env.AUTH_KEY, (err, loggedUser) => {
    if (err) {
      res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
    // check if the logged user is a user  
    } else if (loggedUser.user.user_type === 'mentor') {
      res.status(403).json({
        status: 403,
        error: 'You are not allowed to access this route',
      });
    } else if (loggedUser.user.user_type === 'admin') {
      res.status(200).json({
        status: 200,
        all_reviews: reviews,
      });
    } else if (!findSession) {
      res.status(404).json({
        status: 404,
        error: 'The given course ID does not exits',
      });
    // check if is the user who requested  
    } else if (loggedUser.user.id !== findSession.menteeId) {
      res.status(404).json({ 
        status: 404,
        error: 'The given course ID is not the course you requested',
      });
    } else if (findSession.status === 'pending' || findSession.status === 'rejected') {
      res.status(401).json({
        status: 401,
        error: 'Can not review session that was not accepted',
      });
    } else if (result.error) {
      res.status(400).json({
        status: 400,
        error: result.error.details[0].message,
      });
    } else {
      const review = {
        id: reviews.length + 1,
        sessionId: req.params.id,
        meteeNames: `${loggedUser.user.first_name} ${loggedUser.user.last_name}`,
        score: req.body.score,
        remark: req.body.remark,
      };
      reviews.push(review);
      res.status(200).json({
        message: 'Your review was successfully posted',
        status: 200,
        review,
      });
    }
  });
});

export default router;
