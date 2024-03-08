# Oasis Cafe

## [Check out the live site here](https://oasis-cafe-next-js.vercel.app/)

## Overview

Online Cafe developed with a Next.js client and Node.js server. Integrated with Stripe for payment processing.

## Requirements

To run Oasis Cafe locally, you'll need the following:

- [Node.js](https://nodejs.org/en)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (Node Package Manager)
- A Stripe account for testing payments. [Sign up for free here](https://dashboard.stripe.com/register).
- [MongoDB](https://www.mongodb.com/) connection

## Instructions

### Server 

1. **Install Node Packages**: Run `npm install` to install all required dependencies.

2. **Set environmental variables**: Create a `.env` file in the root of the server folder and populate it with your Stripe secret key and a MongoDB connection URL secret key.

    ```env  
    STRIPE_SECRET_KEY = {{stripe_secret_key}}
    CONNECTION_URL = {{mongodb_connection_url}}
    ```

3. **Start the server**: Run `npm start`. The application will be accessible at [http://localhost:5000](http://localhost:5000).

### Client

1. **Run development server**: Using `npm run dev`

2. **Set environmental variables**: Create a `.env` file in the root of the cafe-client folder and add the local address of where the server is running.

    ```
    NEXT_PUBLIC_BASE_URL = http://localhost:5000
    ```

## Testing

To test payment functionalities, use the [testing card numbers provided by Stripe](https://docs.stripe.com/testing).