# nextgenvest-frontend
For the front-end application

Compatible with Node version 6.9.0 or higher

## Info
This application lets a user enter loan information and view the payoff details on a graph.
It provides loan information from a node server and scrapes [the Student Aid website](https://studentaid.ed.gov/sa/types/loans/interest-rates) for direct loan rates.

## To Run
Getting the app up on your local machine is simple:
0. Make sure you have at least Node v6.9.0 and NPM 3.10.8 or higher installed on your machine.
1. Clone the application with `git clone https://github.com/rhyneav/nextgenvest-frontend.git`
2. Change into the cloned directory with `cd nextgenvest-frontend`
3. Install dependencies with `npm install`
4. Run the server with `npm start`
5. Go to `localhost:3000` in a web browser to view it live!

Alternatively, check out the live application on a [Heroku dyno here](https://lit-oasis-13349.herokuapp.com/)!

## Checklist:
- [x] Your widget is an angular component
- [x] Styling is done with SASS
- [x] Widget shows a graph (or similar) of expected payoff amount given a payoff date
- [x] Widget can take as input a loan amount (typed into an input box). Ex: 60000
- [x] Widget can take as input an interest rate (typed into an input box). Ex: 0.05
- [x] Widget can take as input loan period (in months) (typed into an input box). Ex: 36
- [x] There exists somewhere on the page the current student loan interest rate. Ex: 0.03
- [x] The rate is fetched by the nodejs server
- [x] Your project has a README.md with build instructions