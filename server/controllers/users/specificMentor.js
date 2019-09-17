import express from 'express';
import jwt from 'jsonwebtoken';
import users from '../../models/user';
import verifyToken from '../../middleware/verifyToken';


const router = express.Router();

router.get('/mentors/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (err, loggedUser) => {
    // eslint-disable-next-line radix
    const user = users.find((c) => c.id === parseInt(req.params.id));

    if (err) {
      res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
    // users are allowed to access this route
    } else if (loggedUser.user.user_type === 'mentor') {
      res.status(403).json({
        status: 403,
        error: 'You are not allowed to access this route',
      });
    // throw error if user id not exists
    } else if (!user) {
      res.status(404).json({
        status: 404,
        error: 'Mentor with the given ID does not exists',
      });
    // throw error when the user type is not a mentor
    } else if (user.user_type !== 'mentor') {
      res.status(400).json({
        status: 400,
        error: 'Bad request, check the ID and try again',
      });
    // display the result
    } else {
      res.status(200).json({
        status: 200,
        data: {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          address: users.address,
          bio: user.bio,
          occupation: user.occupation,
          expertise: user.expertise,
          userTpye: user.user_type,
        },
      });
    }
  });
});

export default router;
