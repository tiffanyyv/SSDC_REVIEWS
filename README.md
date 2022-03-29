# STEELIX-SDC RATINGS & REVIEWS
This is the endpoint for the Ratings & Reviews module.

## Setup
- Clone the package into your repository
- Install dependencies with `npm install`
- Load the database with `npm run build`
- Start the server with `npm start`
- Follow the instructions in config_example.js

## Endpoints
`GET api/reviews` returns reviews for a particular product, sorted by 'newest' by default.

`GET api/reviews/meta` returns review metadata for a particular product.

`POST api/reviews` adds a review for a particular product.

`PUT api/reviews/:review_id/helpful` marks a review as helpful.

`PUT api/reviews/:review_id/report` reports a review.

