const express = require ('express');
const router = express.Router();
const {home} = require('../../controllers/mainController/main-controller');

router.route('/').get(home);


module.exports = router;