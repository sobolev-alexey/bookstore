# Book shop e-commerce site

The frontend uses:
* [React](https://reactjs.org/)
* [Ant Design System](https://ant.design/components/overview/)
* [Create React App boilerplate](https://create-react-app.dev/)
* [Sass CSS preprocessor](https://sass-lang.com/)
* [Cypress e2e testing framework](https://www.cypress.io/)
* [Stripe payment processing](https://stripe.com/)

The backend is headless and uses:
* [Node.js](https://nodejs.org/en/)
* [NestJS framework](https://nestjs.com/)


### Disclaimer

The design of the page was taken from the https://www.bookdepository.com/. This project was created for demonstrational purposes only. I do **NOT** intend to produce any commercial content from this!

### Insights

Home page

<img src="./documentation/screenshots/client/landing.png">

[More screenshots](./documentation/screenshots/client/README.md)


## Setup & Run

### Prerequisites:
Client & server
- NodeJS version: 16 (not supported: 17)
- Web browser: Chrome, Mozilla Firefox
- [Optional] Stripe keypair (publishable and secret keys) for payment processing

<hr>

### Installation

#### React & Nodejs
To install the dependencies for both `/client` & `/server` folders followed by database initialization run the following command from the root folder: <br>

```bash
npm run install-all
```

### Run

Open up two terminals and run `npm start` in both terminals

#### Webserver

/server -> `npm start`

#### Client

/client -> `npm start`

<br />  

### Documentation

#### [Webserver documentation](./server/README.md)

#### [Client documentation](./client/README.md)

<br />  