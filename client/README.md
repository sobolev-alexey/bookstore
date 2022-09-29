



# Book shop e-commerce site

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Technologies
* [React](https://reactjs.org/)
* [Ant Design System](https://ant.design/components/overview/)
* [Create React App boilerplate](https://create-react-app.dev/)
* [Sass CSS preprocessor](https://sass-lang.com/)
* [Cypress e2e testing framework](#testing)
* [Stripe payment processing](#payment-processing-with-stripe)

<hr>

## Key Features
search

scroll to

banner

carousel

random recommendations

stripe checkout, real stripe data fetching

simple checkout

cart change qty

backend order storage, export

<hr>

## Payment processing with Stripe

* **Stripe payment is optional**, purchase process can be completed without this feature
* To enable Stripe payment processing, you need to obtain a test keypair (publishable and secret keys) from [Stripe](https://stripe.com/)
* In the `.env` file update the `REACT_APP_STRIPE_KEY` property with the secret key (starts with `pk_test_`)
* Also modify the `.env` file of the server backend, update the `STRIPE_SECRET_KEY` property with the secret key (starts with `sk_test_`)
* Stripe will create a test order, which can be found on their [payments dashboard](https://dashboard.stripe.com/test/payments)

<img src="../documentation/screenshots/client/stripe_dashboard.png">
<br />
<img src="../documentation/screenshots/client/stripe_dashboard_order.png">

<hr>

## Testing
* [Cypress](https://www.cypress.io/) Testing Framework is used to test end-to-end functionality on each page
* Test suite definitions are available under [./cypress/e2e](./cypress/e2e)
* Cypress application can be started by executing `npm run cy:open` from another terminal. **Please make sure that client application is running in the main terminal**
* Select `E2E Testing` option once the application starts, then select Chrome browser  

<img src="../documentation/screenshots/client/cypress_start.png">

* In the window which opens next select one of the available spec files, e.g. **landing.cy.js**  

<img src="../documentation/screenshots/client/cypress_specs.png">

* The respective test suite will execute automatically producing a visual feedback which can be followed along. Each test case can be replayed by navigating over them with the cursor.

<img src="../documentation/screenshots/client/cypress_cart.gif">

* **Important** If you have **Stripe** enabled, please use test suite `checkout_stripe.cy.js`, otherwise use `checkout.cy.js`. The first one is configured to check iFrame elements not available in the other version.

<img src="../documentation/screenshots/client/cypress_checkout.gif">

* Cypress also works in a headless mode where it will run all test suites and generate screenshots/videos in case of any issues. It can be started with `npm test`  


<hr>


## Performance
* Server responses are cached and stored in browsers' local storage
* Image assests (book covers) are fetched from CDN and cached by the browser
* Stateless React components which display static book data are cached using **React.memo** 

<hr>

## Bundle size
* The build is minified and the filenames include the hashes
* Bundle size without source maps is 1.4 MB, from which minified JS portion is 725 kB and minified CSS portion is 570 kB

<hr>

## Setup & run

* If packages were not installed using `npm run install-all` from the root folder, install packages manually by running `npm install` in the `client` folder
* Run application with `npm start`
* Make sure that server backend is up and running in another terminal

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the Cypress test runner

#### `npm run cy:open`

Launches the interactive Cypress application with extended functionality.\
See the section about [running tests](#testing) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
