# PaySlip
Generate Monthly Payslips from employee annual salary 
The web application calculates employees monthly payslips based on their annual salaries.
App Technology : Node, Express, Mocha, Chai, grunt, Angular.js, Bootstrap, HTML, CSS.

Features:
  1. Upload employee csv format with a delimiter of ' , '  
  2. Calculates monthly gross income, income tax, netIncome, super and displays in table.
  

### CSV Format 
### Name                 Type      Tag
 1. firstName            string     1
 2. lastName             string     2
 3. annualSalary         number     3
 4. super                number     4
 5. paymentStartDate     number     5


To Deploy this application on your side, follow the guidelines given below.
  1. Fork or download the repository
  2. install node js, npm, bower
  3. Install npm dependencies, run command: npm install
  4. Install bower dependencies, run command: bower install
  5. Unit test with Mocha with command: npm test
  6. run application server with command: grunt

