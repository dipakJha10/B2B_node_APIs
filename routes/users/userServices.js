const router = require('express').Router();
const dbServices = require('../../models/models');
const constants = require('../../utils/constants');
const httpStatus = require('http-status')

const orderServices = dbServices.orders;
const productServices = dbServices.products;

router.post('/orders', async (req, res) => {
    req.body.orderDate = new Date().getTime();
    let newOrders = new orderServices(req.body);
    try {
        const order = await newOrders.save();
        res.status(200).json({ status: httpStatus.OK, message: constants.SUCCCESS_MSG, data: order });
    } catch (exception) {
        console.log(exception)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: constants.FAILURE_MSG, data: null });
    }
});

router.get('/orders', async (req, res) => {
    let offset;
    let limit;
    if (req.query.pageNo && req.query.perPage) {
        req.query.perPage = parseInt(req.query.perPage);
        req.query.pageNo = parseInt(req.query.pageNo);
        offset = req.query.perPage * (req.query.pageNo - 1);
        limit = req.query.perPage;
    } else {
        offset = 0;
        limit = 20;
    }
    try {
        const orders = await orderServices.find({
            customerId: req.query.customerId
        })
            .skip(offset)
            .limit(limit)
            .sort({ orderDate: -1 });
        res.status(200).json({ status: httpStatus.OK, message: constants.SUCCCESS_MSG, data: orders });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: constants.FAILURE_MSG, data: null });
    }

});

router.get('/products', async (req, res) => {
    let offset;
    let limit;
    if (req.query.pageNo && req.query.perPage) {
        req.query.perPage = parseInt(req.query.perPage);
        req.query.pageNo = parseInt(req.query.pageNo);
        offset = req.query.perPage * (req.query.pageNo - 1);
        limit = req.query.perPage;
    } else {
        offset = 0;
        limit = 40;
    }
    try {
        const products = await productServices.find({
        })
            .skip(offset)
            .limit(limit);
        res.status(200).json({ status: httpStatus.OK, message: constants.SUCCCESS_MSG, data: products });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: constants.FAILURE_MSG, data: null });
    }

});


module.exports = router;