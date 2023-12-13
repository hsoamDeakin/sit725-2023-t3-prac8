let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller')

router.post('/', (req, res) => {
    controller.postCat(req, res);
})

router.get('/', (req, res) => {
    try {
        // Assuming getAllCats is an asynchronous function that returns a Promise
        controller.getAllCats(req, res);        
        // The code here will be executed after getAllCats is complete
      } catch (error) {
        console.error('Error during getAllCats:', error);
        // Handle the error if necessary
      }    
});

module.exports = router;