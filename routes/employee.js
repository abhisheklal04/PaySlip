var express = require('express');
var router = express.Router();

var INCOME_CALC = require('../helpers/incomeCalculator');
var CONSTANTS = require('../helpers/constants').constants;
var MESSAGES = require('../helpers/messages').messages;
var UTILITY = require('../helpers/utility').utils;

var busboy = require('connect-busboy');
var csv = require('fast-csv');
//...
router.use(busboy());


// POST method to generate payslips
router.post('/paySlip', function(req, res, next) {

    try {
        var employees = [];
        var errorLineNos = [];
        var uploadErrorMessage = null;
        var fstream;

        req.pipe(req.busboy);
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            var fileExt = filename.split('.').pop();
            if (fileExt != CONSTANTS.employeeFileUploadExt) {
                return next(new Error(MESSAGES.paySlipFileUpload_ExtError));
            }

            var lineNo = 0;

            file.pipe(csv())
                .on('data', function(data) {
                    // parsing csv data line by line
                    if (lineNo > 0 && lineNo <= CONSTANTS.excelFileUploadLimit) {
                                             
                        if (!UTILITY.addExcelDataToJSONListBySchema(data, employees, CONSTANTS.employeeExcelSchema)) {
                            errorLineNos.push(lineNo);
                            uploadErrorMessage = MESSAGES.paySlipFileUpload_ErrorAtLine;
                        }
                    } else if (lineNo == 0) {
                        // checking csv header.
                        var employeeSchema = CONSTANTS.employeeExcelSchema;
                        employeeSchema.forEach(function(value, index) {
                            if (value.name != data[index]) {
                                uploadErrorMessage = MESSAGES.paySlipFileUpload_IncorrectHeader;
                            }
                        });
                    } else { 
                        // csv row limit overflows.                       
                        uploadErrorMessage = MESSAGES.paySlipFileUpload_FileLimitError + CONSTANTS.excelFileUploadLimit;
                        errorLineNos = [];
                    }

                    lineNo++;
                })
                .on("end", function() {
                    // generating payslips from parsed csv
                    if (uploadErrorMessage == null) {
                        
                        var paySlips = [];
                        employees.forEach(function(emp, index) {
                            var paySlip = INCOME_CALC.monthlyPay(emp);
                            if (paySlip != null) {
                                paySlips.push(paySlip);
                            } else {
                                errorLineNos.push(index+1);
                                uploadErrorMessage = MESSAGES.paySlipFileUpload_ErrorAtLine;                                
                            }
                        });
                    }

                    if (uploadErrorMessage != null) {
                        
                        uploadErrorMessage = errorLineNos.length > 0 
                            ? uploadErrorMessage + errorLineNos 
                            : uploadErrorMessage; 

                        return next(new Error(uploadErrorMessage));
                    }

                    res.send(paySlips);
                });
        });

    } catch (e) {
        console.log(e);
        return next(new Error(MESSAGES.unknownError));
    }
});

module.exports = router;
