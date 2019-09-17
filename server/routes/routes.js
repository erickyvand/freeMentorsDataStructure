import express from 'express';

import signupController from '../controllers/users/signup';
import signinController from '../controllers/users/signin';
import changerUserController from '../controllers/users/changeUser';
import mentorsController from '../controllers/users/mentors';
import specificMentorController from '../controllers/users/specificMentor';
import allUsersController from '../controllers/users/allUsers';

import requestSessionController from '../controllers/sessions/requestSession';
import acceptRequestController from '../controllers/sessions/acceptRequest';
import rejectRequestController from '../controllers/sessions/rejectRequest';
import sessionsController from '../controllers/sessions/sessions';

import reviewController from '../controllers/reviews/reviews';
import deleteReviewController from '../controllers/reviews/deleteReview';

const routes = express();

// users routes
routes.use('/api/v1/auth', signupController);
routes.use('/api/v1/auth', signinController);
routes.use('/api/v1', changerUserController);
routes.use('/api/v1', mentorsController);
routes.use('/api/v1', specificMentorController);
routes.use('/api/v1', allUsersController);

// sessions routes
routes.use('/api/v1', requestSessionController);
routes.use('/api/v1', acceptRequestController);
routes.use('/api/v1', rejectRequestController);
routes.use('/api/v1', sessionsController);

// reviews routes
routes.use('/api/v1', reviewController);
routes.use('/api/v1', deleteReviewController);

export default routes;
