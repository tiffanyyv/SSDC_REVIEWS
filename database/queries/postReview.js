const pool = require('../index.js');

const postReviewQuery = async (
  { product_id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos,
    characteristics
  }, currentUnixDate) => {


  await pool.query(
    `INSERT INTO reviews
    (product_id, rating, review_date, summary, body, recommend, reviewer_name, reviewer_email)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING review_id`
    , [product_id, rating, currentUnixDate, summary, body, recommend, name, email])
    .then(async ({ rows }) => {
      const review_id = rows[0].review_id;
      try {
        if (photos.length > 0) {
          await photos.forEach(photo => {
            pool.query(`INSERT into reviews_photos (review_id, photo_url) VALUES ($1, $2)`, [review_id, photo])
          })
        }
        for (let [characteristic, rating] of Object.entries(characteristics)) {
          await pool.query(`INSERT INTO characteristic_reviews (characteristic_id, review_id, characteristic_value) VALUES ($1, $2, $3)`, [characteristic, review_id, rating])
        }
        console.log('success')
      }
      catch (err) {
        console.log('error posting review')
      }
    }
    )

}

module.exports = postReviewQuery;