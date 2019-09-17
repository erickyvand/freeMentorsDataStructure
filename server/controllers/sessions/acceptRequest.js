/* eslint-disable no-sequences */
/* eslint-disable no-trailing-spaces */
/* eslint-disable radix */
import express from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../../middleware/verifyToken';
import sessions from '../../models/session';

const router = express.Router();

router.patch('/sessions/:sessionId/accept', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (err, loggedUser) => {
    const request = sessions.find((c) => c.sessionId === parseInt(req.params.sessionId));

    if (err) {
      res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
    // check if logged user is a mentor  
    } else if (loggedUser.user.user_type !== 'mentor') {
      res.status(403).json({
        status: 403,
        error: 'You are not allowed to access this route',
      });
    // check if the session id exists  
    } else if (!request) {
      res.status(404).json({
        status: 404,
        error: 'The given session Id does not exists',
      });
    // make sure logged user must update his request  
    } else if (loggedUser.user.id !== request.mentorId) {
      res.status(403).json({
        status: 403,
        error: 'The given session ID is not your request, The logged Mentor Id and requested Mentor Id does not match',
      });
    // check if the request was not rejected before  
    } else if (request.status === 'rejected') {
      res.status(401).json({
        status: 401,
        error: 'This request can not be accepted because was rejected before',
      });
    // check if the request was not accepted before  
    } else if (request.status === 'accepted') {
      res.status(409).json({
        status: 409,
        error: 'This request was made before',
      });
    } else {
      // update status to accepted
      // eslint-disable-next-line no-unused-expressions
      request.status = 'accepted',

      res.status(200).json({
        message: 'The request was successfully accepted',
        status: 200,
        data: {
          sessionId: request.sessionId,
          menteeEmail: loggedUser.user.email,
          questions: request.questions,
          status: request.status,
        },
      });
    }
  });
});

export default router;
