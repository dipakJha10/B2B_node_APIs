const router = require('express').Router();
const dbServices = require('../../models/models');
const constants = require('../../utils/constants');
const httpStatus = require('http-status')

const orderServices = dbServices.orders;
const productServices = dbServices.products;

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

router.post('/products', async (req, res) => {
    let newProduct = new productServices(req.body);
    try {
        const product = await newProduct.save();
        res.status(200).json({ status: httpStatus.OK, message: constants.SUCCCESS_MSG, data: product });
    } catch (exception) {
        console.log(exception)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: constants.FAILURE_MSG, data: null });
    }
});



module.exports = router;