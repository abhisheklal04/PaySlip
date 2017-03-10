(function(exports) {

    var constants = {

        excelFileUploadLimit: 10,

        employeeExcelSchema: [
            { name: 'firstName', type: 'string', length: '20' },
            { name: 'lastName', type: 'string', length: '20' },
            { name: 'annualSalary', type: 'number', length: '10' },
            { name: 'super', type: 'number', length: '2' },
            { name: 'paymentStartDate', type: 'string', length: '30' }
        ],

        employeeFileUploadExt: 'csv',

        taxSlab: [
            { min: 0, max: 18200, flatTax: 0, taxPerDollar: 0 },
            { min: 18201, max: 37000, flatTax: 0, taxPerDollar: 0.19 },
            { min: 37001, max: 80000, flatTax: 3572, taxPerDollar: 0.325 },
            { min: 80001, max: 180000, flatTax: 17547, taxPerDollar: 0.37 },
            { min: 180001, max: Number.POSITIVE_INFINITY, flatTax: 54547, taxPerDollar: 0.45 }
        ]
    }

    exports.constants = constants;
})(module.exports);
