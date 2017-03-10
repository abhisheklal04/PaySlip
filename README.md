# PaySlip
Generate Monthly Payslips from employee annual salary 
The web application calculates employees monthly payslips based on their annual salaries.
App Technology : Node, Express, Mocha, Chai, Angular.js, Bootstrap, HTML, CSS.

Features:
  1. Upload employee csv format with a delimiter ofkjglghlbhjbhjbkhbkjhbk  3. Sorting by name(ASC & DESC) upon clicking name header.
  3. Response from marvel server are cached to prevent the identical datafetch from server.
  4. Application can cache 10 recent character lists and character details requests from marvel server though can be changed in appProperties.js

#       Name            Type            Tag
field   CustID          varchar(10)     1
field   Company         varchar(80)     2
field   Address         varchar(80)     3
field   City            varchar(20)     4
field   State           varchar(10)     5
field   Zip             varchar(10)     6
field   Country         varchar(10)     7
field   Phone           varchar(20)     8

To Deploy this application on your side, follow the guidelines given below.
  1. Fork or download the repository
  2. Create an account on https://developer.marvel.com
  3. Get your API public key and add your custom domain name on https://developer.marvel.com/account page.
  3. Change the MARVEL_API_PUBLIC_KEY with your own public key in appProperties.js . without your account public key the application cannot fetch the data from the marvel server.
  4. Deploy the website on your custom domain.

