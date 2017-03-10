# PaySlip
Generate Monthly Payslips from employee annual salary.
The web application calculates employees monthly payslips based on their annual salaries.

##Tools : Node, Express, Mocha, Chai, Grunt, Angular, Bootstrap, HTML, CSS.

Features:
  1. Upload employee salary details in csv format with a delimiter of ' , '  
  2. Calculates monthly gross income, income tax, netIncome, super and displays in table.
  3. The application generates payslips of 10 employees at a time, but can be increased within constant library.
  4. The csv is validated for the correct file format, no of rows limit, invalid columns, missing headers.

### CSV Format  
### header :: type(length)
 1. firstName ::           string(20) 
 2. lastName  ::           string(20)  
 3. annualSalary ::        number(10)  
 4. super ::               number(2)
 5. paymentStartDate ::    string(30)

### Install Instructions
To Deploy this application on your side, follow the guidelines given below.
  1. Fork or download the repository
  2. install node js, npm
  3. install bower, run command: *npm install -g bower* 
  3. Install npm dependencies, run command: *npm install*
  4. Install bower dependencies, run command: *bower install*
  5. Unit test with Mocha with command: *npm test*
  6. run application server with command: *grunt*
