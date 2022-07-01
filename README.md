# Crypto Kingdom 
Get all the information you need about your favorite cryptocurrencies.

Live Demo:https://crypto-kingdomm.netlify.app


## Technologies:
React, React Hook Form, React-Query, Material-UI, Chart.js, Firebase.


## APP Routes:
The APP contains 7 Routers: 4 Public Routes and 3 Private Routes.<br>

 Public Routes:<br>
   * /signup - creates a new account.<br>
   * /login - login to the app.<br>
   * /forgot-password - sends a password password reset link via email.<br>
   * /*  - 404 not found.<br>
 
Private Routes:<br>
   * /reset-password  - resets the user password. <br>
   * /home  - displays all the information about the cryptocurrencies.<br>
   * /coins/coinname  - displays information about a particular currency.<br> 


##  App Pages:<br>

1. The Signup Page:
    * The signup page contains a form with 3 text fields: email , password and password confirmation.<br>
    * The Signup page uses React Hook Form to validate the form.<br>
    * The email must be a valid email address.<br>
    * The password must contain at least 6 characters and must contain at least one uppercase letter and one digit.<br>
    * A user will be created and stored in Firebase database only if the given information is valid , and the user will be redirected to the Home page.

2. The Login Page:<br>
    * The page uses React Hook Form to validate the user form.<br>
    * If the user is valid he will be redirected to the Home Page.<br>
   
3. The Home Page:
    * The page displays the prices of over 100 cryptocurrencies and their market cap.<br>
    The page consists of 3 main components:Header,Banner,CoinsTable:
       * The Banner component contains a carousel component that displays 4 random cryptocurrencies, if the user clicks on one of the cryptocurrencies, he will be redirected to the same currency page.<br>
       The carousel component was built using React Alice Carousel.<br>
       * The CoinsTable component displays the cryptocurrency values, the user can also filter the list of currencies based on the currency name or currency symbol.<br>
       The CoinsTable component was built using Material-UI.<br>
       * The Header component contains two components: UserSidebar, Currency:<br>
         * The UserSidebar component allows the user to see the currencies he added to his currency list, remove a currency from his list
          and also allows the user to log out from the APP.<br>
	  The UserSidebar component was built using Material-UI.<br>
         * The Currency component allows the user to choose which currency(USD or NIS) he want to see the coins listed in the CoinsTable.<br>
         The Currency component was built using react-country-flag.<br>
         
4. The Coin Page:<br>
  The page displays detailed information about a specific Cryptocurrency, the user can see the currency value for differne time frames in the graph.
 The user can also add or remove a cryptocurrency from his watchlist.
The graph was built using Chart.js.<br>
 
 5. The Forgot Password Page:<br>
   The Forgot Password page allows users to reset their password by receiving a password reset link to the email they signed up for.<br>

 6. The Reset Password Page:<br>
   The user will be able to access the ResetPassword page only after clicking on the password reset link he received from the ForgotPassword page.<br>

 7. The 404 Not Found Page:<br>
  If the user tries to reach an undefined route he will be redirected to the 404 Not Found page and from there he will be able to return back to the login page.<br>

* The APP state is managed using the React Context API.<br>
* The asynchronous data is managed using React-Query.<br>
* The information for the cryptocurrencies is taken from Coin Gecko API
.<br>

## Getting started

### How to run the APP?

```
$ git clone https://github.com/dekelohad/Crypto-Kingdom.git
$ cd Crypto-Kingdom
$ npm install
$create a .env file at the root of the project directory and within it, you will need to enter your Firebase credentials.
$ npm start
# navigate to http://localhost:3000
 ```




