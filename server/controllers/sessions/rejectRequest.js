/* eslint-disable no-sequences */
/* eslint-disable no-trailing-spaces */
/* eslint-disable radix */
import express from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../../middleware/verifyToken';
import sessions from '../../models/session';

const router = express.Router();

router.patch('/sessions/:sessionId/reject', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (err, loggedUser) => {
    const request = sessions.find((c) => c.sessionId === parseInt(req.params.sessionId));

    if (err) {
      res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
    // return forbidden if logged user is not a mentor  
    } else if (loggedUser.user.user_type !== 'mentor') {
      res.status(403).json({
        status: 403,
        error: 'You are not allowed to access this route',
      });
    // return not found if session ID does not exists  
    } else if (!request) {
      res.status(404).json({
        status: 404,
        error: 'The given session Id does not exists',
      });
    // return forbidden if the requested session ID is not for the logged mentor  
    } else if (loggedUser.user.id !== request.mentorId) {
      res.status(403).json({
        status: 403,
        error: 'The logged Mentor Id and requested Mentor Id does not match',
      });
    // not reject the requested that was accepted before  
    } else if (request.status === 'accepted') {
      res.status(401).json({
        status: 401,
        error: 'This request can not be rejected because was accepted before',
      });
    // don't reject request that was rejected before  
    } else if (request.status === 'rejected') {
      res.status(409).json({
        status: 409,
        error: 'This request was rejected before',
      });
    } else {
      // reject the pending request
      request.status = 'rejected';
  
      res.status(200).json({
        message: 'The request was successfully rejected',
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
