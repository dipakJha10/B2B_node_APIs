const router = require('express').Router();
const dbServices = require('../../models/models');
const constants = require('../../utils/constants');
const httpStatus = require('http-status')

const userServices = dbServices.users;

router.post('/signUp', async (req, res) => {
    req.body.userType="customer";
    let newUser = new userServices(req.body);
    try {
        const user = await newUser.save();
        res.status(200).json({ status: httpStatus.OK, message: constants.SUCCCESS_MSG });
    } catch (exception) {
        console.log(exception)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: constants.FAILURE_MSG, data: null });
    }
});

router.post('/addAccount', async (req, res) => {
   // req.body.userType="owner";
    let newUser = new userServices(req.body);
    try {
        const user = await newUser.save();
        res.status(200).json({ status: httpStatus.OK, message: constants.SUCCCESS_MSG });
    } catch (exception) {
        console.log(exception)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: constants.FAILURE_MSG, data: null });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await userServices.find({
            userId: req.body.userId
        })
        if (user.length > 0) {
            if (user[0].password === req.body.password) {
                let userResponse={userName:user[0].userName,
                                   userType:user[0].userType};

                res.status(200).json({ status: httpStatus.OK, message: constants.AUTHORIZATION_SUCCESS_MESSAGE ,user:userResponse});
            } else {
                res.status(404).json({ status: httpStatus.NOT_FOUND, message: constants.PASSWORD_MISMATCH });
            }
        } else {
            res.status(404).json({ status: httpStatus.NOT_FOUND, message: constants.USER_NOT_EXISTS });
        }
    } catch (e) {
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: constants.FAILURE_MSG, data: null });
    }
});

module.exports = router;