/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable no-trailing-spaces */
/* eslint-disable radix */
import express from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../../middleware/verifyToken';
import reviews from '../../models/review';

const router = express.Router();

router.delete('/sessions/:id/review', verifyToken, (req, res) => {
  const findReview = reviews.find((c) => c.id === parseInt(req.params.id));
  const index = reviews.findIndex((c) => c.id === parseInt(req.params.id));
  jwt.verify(req.token, process.env.AUTH_KEY, (err, loggedUser) => {
    if (err) {
      res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
    // check root access  
    } else if (loggedUser.user.user_type !== 'admin') {
      res.status(403).json({
        status: 403,
        error: 'You are not allowed to access this route',
      });
    } else if (!findReview) {
      res.status(404).json({
        status: 404,
        error: 'The review ID not found',
      });
    } else {
      reviews.splice(index, 1);
      res.status(200).json({
        status: 200,
        message: 'Review successfully deleted',
        data: {
          RemainingReviewData: reviews,
        }, 
      });
    }
  });
});

export default router;
