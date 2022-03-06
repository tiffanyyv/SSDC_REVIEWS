const pool = require('../index.js');

const postReviewQuery = async (
  { product_id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
  }, currentUnixDate) => {

  const results = await pool.query(
    `INSERT INTO reviews
    (product_id, rating, review_date, summary, body, recommend, reviewer_name, reviewer_email)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
  , [product_id, rating, currentUnixDate, summary, body, recommend, name, email])

}

module.exports = postReviewQuery;