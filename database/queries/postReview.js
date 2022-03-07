const pool = require('../index.js');

const postReviewQuery = async (
  { product_id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos
  }, currentUnixDate) => {


  const results = await pool.query(
    `INSERT INTO reviews
    (product_id, rating, review_date, summary, body, recommend, reviewer_name, reviewer_email)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING review_id`
  , [product_id, rating, currentUnixDate, summary, body, recommend, name, email])
  .then(async ({ rows }) => {
      let review_id = rows[0].review_id;
      try {
        if (photos.length > 0) {
          await photos.forEach(photo => {
            pool.query(`INSERT into reviews_photos (review_id, photo_url) VALUES ($1, $2)`, [review_id, photo])
          })
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  )

}

module.exports = postReviewQuery;