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


- (If you have not used Stripe before, make sure to create an account first).
- If PostgreSQL is not installed on your machine yet, make sure to do that first: https://www.npmjs.com/package/postgres
- If you have not used Strip before, make sure to create an account first: https://stripe.com/
- Clone the repository so that you can access it locally. 
- Start PostgreSQL by typing psql in your terminal application.
- Create a user and a database for the e-commerce store. 
- Create a .env file. This file should include four environment variables:
  - PGHOST=localhost
  - PGDATABASE=\<nameOfYourDatabase\>
  - PGUSERNAME=\<nameOfYourUsername\>
  - PGDATABASE=\<nameOfYourPassword\>
- Create a .env-local file. This file should include two environment variables for the Stripe payment process (You can get the require secret keys on your Stripe's user account page):
  - NEXT_PUBLIC_PUBLISHABLE_KEY=\<nameOfYourPublishableKey\>
  - SECRET_KEY= \<nameOfYourSecretKey>

