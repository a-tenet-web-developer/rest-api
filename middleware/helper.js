const userController = require('../controllers/userController');
const fs = require('fs');
const formidable = require('formidable');
const { log } = require('console');


module.exports = {
    validateUser: async function (req, res, next) {
        const form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            console.log("121",fields);

            fields.clientId[0].notEmpty().withMessage('clientId is required'),
                  body('inspectionManagerId').notEmpty().withMessage('inspectionManagerId is required'),
                  body('checklistId').notEmpty().withMessage('checklistId is required'),
                  body('procurementManagerId').notEmpty().withMessage('procurementManagerId is required')
                
            
        
        });
    }
}