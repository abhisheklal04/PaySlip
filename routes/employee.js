var express = require('express');
var router = express.Router();
var incomeCalculator = require('../helpers/incomeCalculator');
var constantLib = require('../helpers/constants');
var msgLib = require('../helpers/messages');

var busboy = require('connect-busboy');
var csv = require('fast-csv');
//...
router.use(busboy());


var createEmployeeJson = function(data, employee) {

    var employeeSchema = constantLib.constants.employeeExcelSchema;
    var empObj = [];
    if (data.length == employeeSchema.length) {
        data.forEach(function(value, index) {
            empObj[employeeSchema[index]] = value;
        });
        employee.push(empObj);
        return true;
    } else {
        return false;
    }

}

// POST method to generate payslips
router.post('/paySlip', function(req, res, next) {

    try {
        var employee = [];
        var uploadErrorMessage = null;
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            var fileExt = filename.split('.').pop();
            if (fileExt != constantLib.constants.employeeFileUploadExt) {
                return next(new Error(msgLib.messages.paySlipFileUpload_ExtError));
            }

            var lineNo = 0;

            file.pipe(csv())
                .on('data', function(data) {

                    if (lineNo > 0) {
                        //console.log('Line No:' + lineNo + ": ", data);
                        if (!createEmployeeJson(data, employee)) {
                            uploadErrorMessage = msgLib.messages.paySlipFileUpload_FormatError;
                        }
                    } else {
                        // checking csv header.
                        var employeeSchema = constantLib.constants.employeeExcelSchema;
                        employeeSchema.forEach(function(value, index) {
                            if (value != data[index]) {
                                uploadErrorMessage = msgLib.messages.paySlipFileUpload_IncorrectHeader;
                            }
                        });
                    }

                    lineNo++;
                })
                .on("end", function() {
                    //console.log("CSV Parsing Done..");
                    //console.log("Generating Payslips...");                    
                    //console.log('valid employee size: ' + employee.length);

                    if (uploadErrorMessage != null) {
                        return next(new Error(uploadErrorMessage));
                    }

                    var paySlips = [];
                    employee.forEach(function(employee) {
                        var paySlip = incomeCalculator.monthlyPay(employee);
                        if (paySlip != null) {
                            paySlips.push(paySlip);
                        } else {
                            uploadErrorMessage = msgLib.messages.paySlipFileUpload_FormatError;
                            return false;
                        }
                    });

                    if (uploadErrorMessage != null) {
                        return next(new Error(uploadErrorMessage));
                    }

                    res.send(paySlips);
                });
        });

    } catch (e) {
        console.log(e);
        return next(new Error('Unknown Error'));
    }
});

module.exports = router;
