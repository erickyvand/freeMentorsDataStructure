import express from 'express';
import jwt from 'jsonwebtoken';
import users from '../../models/user';
import verifyToken from '../../middleware/verifyToken';


const router = express.Router();

// eslint-disable-next-line no-use-before-define
router.patch('/user/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (err, loggedUser) => {
    // eslint-disable-next-line radix
    const user = users.find((c) => c.id === parseInt(req.params.id));

    // check if error to throw a forbidden
    if (err) {
      res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
    // prevent user who is not an admin to access the route
    } else if (loggedUser.user.user_type !== 'admin') {
      res.status(403).json({
        status: 403,
        error: 'You are not allowed to access this route',
      });
    // check if user ID exists
    } else if (!user) {
      res.status(404).json({
        status: 404,
        error: 'User with the given ID does not exits',
      });
    // admin can not be changed to mentor
    } else if (user.user_type === 'admin') {
      res.status(403).json({
        status: 403,
        error: 'Admin can not be changed to mentor',
      });
    // Unauthorize if already a user was updated to mentor
    } else if (user.user_type === 'mentor') {
      res.status(409).json({
        status: 409,
        error: 'User already changed to mentor',
      });
    } else {
      // update if everything went right
      user.user_type = 'mentor';
      res.status(200).json({
        message: 'User account changed to mentor',
        status: 200,
        data: {
          firstName: user.first_name,
          lastName: user.last_name,
          status: user.user_type,
        },
      });
    }
  });
});

export default router;
