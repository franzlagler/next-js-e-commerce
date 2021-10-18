# Next.js E-Commerce Store (American Candy Store)

## Description

The e-commerce store is a full-stack application that simulates a real-life webshop. You can choose from a variety of products, select the amount of products you want to order and add them to a cart. After you have decided which products you want to buy, you can go to checkout and complete the order. To make the shopping experience as real as possible, the application also includes a fictive payment process using Stripe. 

## Technologies

- Next.js
- React
- Typesript
- PostgreSQL
- Stripe
- Emotion
- Jest unit tests
- Cypress E2E tests

## Setup

If you would like to set up the project yourself, stick to the following instructions: 


- If PostgreSQL is not installed on your machine yet, make sure to do that first: https://www.npmjs.com/package/postgres
- If you have not used Strip before, make sure to create an account first: https://stripe.com/
- Clone the repository so that you can access it locally.
- Connect the newly created local repository to your GitHub Account. 
- Start PostgreSQL by typing psql in your terminal application.
- Create a user and a database for the e-commerce store. 
- Create a .env file. This file should include four environment variables:
  - PGHOST=localhost
  - PGDATABASE=\<nameOfYourDatabase\>
  - PGUSERNAME=\<nameOfYourUsername\>
  - PGDATABASE=\<nameOfYourPassword\>
- Create a .env.local file. This file should include two environment variables for the Stripe payment process (You will find the require secret keys on your Stripe's user account page):
  - NEXT_PUBLIC_PUBLISHABLE_KEY=\<nameOfYourPublishableKey\>
  - SECRET_KEY= \<nameOfYourSecretKey>
- Install all required dependencies locally using the `yarn` command in your terminal.
- Install the global package dotenv-cli typing `yarn global add dotenv-cli` into your terminal.
- Run all the required migrations using `yarn migration up` in your terminal.
- Start the server with `yarn dev` and view the webpage on `localhost:3000` in your browser.


## Deployment

The following instructions will allow you to deploy your application online using Heroku:

- If you have not yet a Heroku account, make sure to create one first.
- On Heroku create a new app on your dashboard page.
  - Give it the name you would like
  - Choose the region depending on where you exactly live.
- Go to your application page and click on 'Deploy'.
- Under 'Deployment method', select your online GitHub repository that Heroku will connect with.
- Under 'Manual Deploy', click on 'Deploy Branch'. The process should usually not take more than a couple of minutes.
- After the process has finished, click on 'Open app' at the top of your application page. Now you can view the deployed version of the application
