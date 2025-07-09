var express = require('express');
var router = express.Router();

var user = require('../controller/usercontroller');
var product = require('../controller/productcontroller');


router.post('/',user.insert);
router.get('/',user.get_data);
router.post('/update/:id',user.update_data);
router.get('/delete/:id',user.delete_data);

router.post('/product',product.insert);
router.get('/product',product.get_data);




/* Login 17-04-2024 */
router.post('/login',user.login);
router.get('/logout',user.logout);







module.exports = router;
