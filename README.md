 
## Crypto Kingdom - Get All The Info Regarding Your Favorite Crypto Currency
 
 Live Demo: https://crypto-kingdomm.netlify.app/
 
The Crypto Kingdom app allows authenticated users to get all the information about their favorite cryptocurrencies.

## Technologies:
React,React-Query,Material-UI, Chart.js,Firebase.
 
## The App routes:
The App contains 7 routers: 4 public routes and 3 protected routes.

The public routes:<br>
	1)/signup - Allows user to registred to the app.<br>
	2)/login - Allows user to sign in to the app.<br>
	3)/forgot-password - Allows the user to receive a password reset email link.<br>
	4)Any attempt to reach a different route will redirect the user to 404 not found page.<br>

The protected routes:<br>
  1)/reset-password  - Allows user to reset their password. <br>
	2)/home  - Displays the cryptocurrency information.<br>
	3)/coins/coinname  - Displays more information about a specific currency.<br> 
  
##  The app pages:<br>

1.  Signup Page:
    * The signup page contains a form with 3 fields: email , password and confirm password.<br>
    * The registration page uses React Hook form to validate the form.<br>
    * The email must be a valid email address.<br>
    * The password must contain at least 6 characters and must contain at least one uppercase letter and one digit.<br>
    * If the user information is valid, the user will be saved in firebase and redirected to the home page.<br>

2.  Login Page:<br>
    * The page uses React Hook Form to validate the user form.<br>
    * Only if the user enters a valid user information he will redirected to the Home Page.<br>
   
3.  Home Page:
    * The page displays over 100 cryptocurrencies prices and their marketcap ,the page consist of 3 components:Header,Banner,CoinsTable:
       * The Banner component contains a carousel that displays 4 random cryptocurrencies items ,in case the user clicks on one of the items,then the user will         be redirected to that CoinPage, built using React Alice Carousel.<br>
       * The CoinsTable component displays the values of the cryptocurrencies, the user can also filter the list of currencies based on currency name or currency symbol,built using Material-UI.<br>
       * The Header contains two components: CurrencyComponent, UserSidebar:<br>
         * The Currency component that allow the user to select in which currency(USD or NIS) he want to see the coins that are listed in the CoinsTable,built using  reac country-flag.<br>
         * The UserSidebar component allows the user to see the currencies he has added to his currency list,and in addition allows the user to logout from   the Crypto Kingdom app.<br>
 
 
3.  Coin Page:<br>
  The page contains more information about a specific currency, the user  can get general information about the currency, add or remove a currency to his watchlist.
User can also see the coin value for differne time frames in a graph which was build with chart.js.<br>
 
 5.  Forgot Password Page:<br>
   The Forgot Password page allows users to reset their password by receiving a password reset link to the email they signed up for.<br>

 6.  Reset Password Page:<br>
   The user will go to the ResetPassword page only after clicking on the password reset link he received from the ForgotPassword page.<br>

 7.  404 Not found Page:<br>
  If the user tries to switch to an undefined route he will reach the 404 error page which allows him to go back to the login page.<br>
<br>

* The app state is managed by React Context API.<br>
* The asynchronous code is managed by React-Query.<br>
* The cryptocurrency coins data is taken from  Coin Gecko API.<br>
 


