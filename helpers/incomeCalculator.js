(function(exports) {

    var constantLib = require('../helpers/constants');

    var taxSlab = constantLib.constants.taxSlab;

    function MonthlyPaySlip(name, period, grossIncome, incomeTax, netIncome, superAnnuation) {
        this.name = name;
        this.period = period;
        this.grossIncome = grossIncome;
        this.incomeTax = incomeTax;
        this.netIncome = netIncome;
        this.superAnnuation = superAnnuation;
    }

    function calcGrossIncome(annualSalary) {
        return Math.round(annualSalary / 12);
    }

    function calcIncomeTax(annualSalary) {
        for (var i = 0; i < taxSlab.length; i++) {
            var slab = taxSlab[i];
            if (annualSalary >= slab.min && annualSalary <= slab.max) {
                return Math.round((slab.flatTax + ((annualSalary - (slab.min - 1)) * slab.taxPerDollar)) / 12);
            }
        }
    }


    function monthlyPay(employee) {
        try {            
            var paySlip = new MonthlyPaySlip(
                employee.firstName === undefined || employee.lastName === undefined 
                	? undefined : employee.firstName + " " + employee.lastName,
                employee.paymentStartDate,
                calcGrossIncome(employee.annualSalary),
                calcIncomeTax(employee.annualSalary),
                calcGrossIncome(employee.annualSalary) - calcIncomeTax(employee.annualSalary),
                Math.round(calcGrossIncome(employee.annualSalary) * employee.super / 100));

            if (paySlip.name === undefined || paySlip.period === undefined || isNaN(paySlip.grossIncome) 
            	|| isNaN(paySlip.incomeTax) || isNaN(paySlip.netIncome) || isNaN(paySlip.superAnnuation)) {
                
                //console.log("incorrect input:" + JSON.stringify(paySlip));
                throw new Error('incorrect input');
            }

            return paySlip;
        } catch (e) {
            //console.log(e);
            return null;
        }
    }

    exports.monthlyPay = monthlyPay;
})(module.exports);
