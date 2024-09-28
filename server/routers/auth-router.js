const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controller');
const validate = require('../middlewares/auth-middleware');
const authMiddleware = require('../middlewares/jwt-middleware');
const signupSchema = require('../validator/auth-validate');
// const loginSchema = require('../validator/auth-validate');

router.route("/").get(authControllers.home);


router.route("/register").post(validate(signupSchema), authControllers.register);

router.route("/login").post(authControllers.login);

router.route("/user").get( authControllers.getUser);

router.route("/scheduled").post(authControllers.scheduledMeetings);

router.route('/:userId/scheduled-meetings').get(authControllers.getScheduledMeetings);

router.route('/:userId/previous-meetings').post(authControllers.addPreviousMeeting);

router.route('/:userId/previousmeetings').get(authControllers.getPreviousMeeting);

router.route('/saveRecordings').post(authControllers.saveRecordings);



module.exports = router